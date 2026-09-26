import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users,
  Check,
  UserPlus,
  Loader2,
  RotateCcw,
  Clock,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import Card from "../Components/common/Card";
import Button from "../Components/common/Button";
import Badge from "../Components/common/Badge";
import api from "../services/api";

function getInitials(name = "") {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatDate(date) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function Connections() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [connections, setConnections] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filters = ["All", "Pending", "Connected", "Rejected"];

  // =========================
  // GET CONNECTIONS
  // =========================
  const fetchConnections = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/connections");

      console.log("Connections:", response.data);

      setConnections(response.data || []);
    } catch (err) {
      console.error("Connections error:", err);

      setError(
        err.response?.data?.message ||
          "Failed to load connections."
      );

      toast.error("Failed to load connections.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  // =========================
  // CURRENT USER ID
  // =========================
  const currentUserId = localStorage.getItem("userId");

  // =========================
  // PREPARE DISPLAY DATA
  // =========================
  const displayConnections = useMemo(() => {
    return connections.map((connection) => {
      const isSender =
        String(connection.senderId) === String(currentUserId);

      const personName = isSender
        ? connection.receiverName
        : connection.senderName;

      return {
        ...connection,
        personName: personName || "User",
        isSender,
      };
    });
  }, [connections, currentUserId]);

  // =========================
  // SEARCH + FILTER
  // =========================
  const filteredConnections = useMemo(() => {
    return displayConnections.filter((connection) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        connection.personName
          .toLowerCase()
          .includes(search);

      let matchesFilter = true;

      if (activeFilter === "Pending") {
        matchesFilter =
          connection.status === "PENDING";
      }

      if (activeFilter === "Connected") {
        matchesFilter =
          connection.status === "ACCEPTED";
      }

      if (activeFilter === "Rejected") {
        matchesFilter =
          connection.status === "REJECTED";
      }

      return matchesSearch && matchesFilter;
    });
  }, [
    displayConnections,
    searchTerm,
    activeFilter,
  ]);

  // =========================
  // STATS
  // =========================
  const connectedCount = connections.filter(
    (connection) =>
      connection.status === "ACCEPTED"
  ).length;

  const pendingCount = connections.filter(
    (connection) =>
      connection.status === "PENDING"
  ).length;

  // =========================
  // SEND CONNECTION
  // =========================
  const handleConnect = async (receiverId) => {
    try {
      await api.post("/connections", {
        receiverId: receiverId,
      });

      toast.success("Connection request sent.");

      await fetchConnections();
    } catch (err) {
      console.error("Send connection error:", err);

      toast.error(
        err.response?.data?.message ||
          "Failed to send connection request."
      );
    }
  };

  // =========================
  // ACCEPT / REJECT
  // =========================
  const handleStatusChange = async (
    connectionId,
    status
  ) => {
    try {
      await api.put(
        `/connections/${connectionId}/status`,
        null,
        {
          params: {
            status: status,
          },
        }
      );

      toast.success(
        status === "ACCEPTED"
          ? "Connection accepted."
          : "Connection rejected."
      );

      await fetchConnections();
    } catch (err) {
      console.error(
        "Connection status error:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Failed to update connection."
      );
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Connections
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Manage your professional connections.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
              <Users size={20} className="text-zinc-300" />
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Total
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {connections.length}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
              <Check size={20} className="text-zinc-300" />
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Connected
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {connectedCount}
              </p>
            </div>
          </div>
        </Card>

        <Card className="col-span-2 p-5 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-3">
              <Clock size={20} className="text-zinc-300" />
            </div>

            <div>
              <p className="text-xs text-zinc-500">
                Pending
              </p>

              <p className="mt-1 text-2xl font-bold text-white">
                {pendingCount}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* SEARCH + FILTER */}
      <Card className="p-4">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search connections..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-950 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() =>
                  setActiveFilter(filter)
                }
                className={`rounded-lg border px-4 py-2 text-sm font-medium transition ${
                  activeFilter === filter
                    ? "border-white bg-white text-black"
                    : "border-zinc-800 bg-zinc-950 text-zinc-400 hover:border-zinc-600 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* HEADING */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Connections
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            {filteredConnections.length} result
            {filteredConnections.length !== 1
              ? "s"
              : ""}
          </p>
        </div>

        <button
          type="button"
          onClick={fetchConnections}
          className="rounded-lg border border-zinc-800 bg-zinc-950 p-2.5 text-zinc-400 hover:border-zinc-600 hover:text-white"
          title="Refresh"
        >
          <RotateCcw size={17} />
        </button>
      </div>

      {/* LOADING */}
      {loading ? (
        <Card className="flex flex-col items-center justify-center py-16">
          <Loader2
            size={30}
            className="animate-spin text-zinc-400"
          />

          <p className="mt-3 text-sm text-zinc-500">
            Loading connections...
          </p>
        </Card>
      ) : error ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-sm text-red-400">
            {error}
          </p>

          <Button
            variant="secondary"
            className="mt-5"
            onClick={fetchConnections}
          >
            <RotateCcw size={16} />
            Retry
          </Button>
        </Card>
      ) : filteredConnections.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full border border-zinc-800 bg-zinc-900 p-4">
            <Users size={24} className="text-zinc-500" />
          </div>

          <h3 className="mt-4 font-semibold text-white">
            No connections found
          </h3>

          <p className="mt-1 text-sm text-zinc-500">
            Your connection requests will appear here.
          </p>
        </Card>
      ) : (
        /* CONNECTION LIST */
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredConnections.map((connection) => (
            <Card
              key={connection.id}
              className="p-5 transition hover:border-zinc-700"
            >
              {/* USER */}
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-bold text-white">
                  {getInitials(
                    connection.personName
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-semibold text-white">
                    {connection.personName}
                  </h3>

                  <p className="mt-1 text-xs text-zinc-500">
                    Connection request
                  </p>
                </div>
              </div>

              {/* DETAILS */}
              <div className="mt-5 space-y-3">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Users size={16} />

                  <span>
                    {connection.isSender
                      ? "Request sent"
                      : "Request received"}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <Clock size={16} />

                  <span>
                    {formatDate(
                      connection.createdAt
                    )}
                  </span>
                </div>
              </div>

              {/* STATUS */}
              <div className="mt-5">
                <Badge>
                  {connection.status}
                </Badge>
              </div>

              {/* ACTIONS */}
              {connection.status === "PENDING" &&
              !connection.isSender ? (
                <div className="mt-5 flex gap-2">
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleStatusChange(
                        connection.id,
                        "ACCEPTED"
                      )
                    }
                  >
                    <Check size={16} />
                    Accept
                  </Button>

                  <Button
                    variant="secondary"
                    className="w-full"
                    onClick={() =>
                      handleStatusChange(
                        connection.id,
                        "REJECTED"
                      )
                    }
                  >
                    <X size={16} />
                    Reject
                  </Button>
                </div>
              ) : connection.status === "PENDING" &&
                connection.isSender ? (
                <Button
                  variant="secondary"
                  className="mt-5 w-full"
                  disabled
                >
                  <Clock size={16} />
                  Request Pending
                </Button>
              ) : connection.status === "ACCEPTED" ? (
                <Button
                  variant="secondary"
                  className="mt-5 w-full"
                  disabled
                >
                  <Check size={16} />
                  Connected
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  className="mt-5 w-full"
                  disabled
                >
                  Rejected
                </Button>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Connections;