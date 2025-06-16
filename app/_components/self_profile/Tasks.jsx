import { useState } from "react";
import {
  Construction,
  Plus,
  CheckCircle2,
  Circle,
  Calendar,
  AlertCircle,
  Clock,
  Home,
  Wrench,
  Users,
  DollarSign,
  Star,
  Trash2,
  Edit3,
  Filter,
  Search,
} from "lucide-react";

const taskCategories = [
  {
    id: "maintenance",
    name: "Maintenance",
    icon: Wrench,
    color: "bg-orange-500",
  },
  { id: "cleaning", name: "Cleaning", icon: Home, color: "bg-blue-500" },
  { id: "guest", name: "Guest Relations", icon: Users, color: "bg-green-500" },
  {
    id: "financial",
    name: "Financial",
    icon: DollarSign,
    color: "bg-purple-500",
  },
  { id: "marketing", name: "Marketing", icon: Star, color: "bg-pink-500" },
  { id: "other", name: "Other", icon: Circle, color: "bg-gray-500" },
];

const priorityLevels = [
  { id: "high", name: "High", color: "text-red-600 bg-red-50 border-red-200" },
  {
    id: "medium",
    name: "Medium",
    color: "text-yellow-600 bg-yellow-50 border-yellow-200",
  },
  {
    id: "low",
    name: "Low",
    color: "text-green-600 bg-green-50 border-green-200",
  },
];

// Sample tasks data
const initialTasks = [
  {
    id: 1,
    title: "Fix leaky faucet in Room A",
    description: "Guest reported dripping faucet in bathroom",
    category: "maintenance",
    priority: "high",
    dueDate: "2025-06-18",
    completed: false,
    property: "Luxury Suite Downtown",
    createdAt: "2025-06-15",
  },
  {
    id: 2,
    title: "Deep clean Room B after checkout",
    description: "Standard deep cleaning required between guests",
    category: "cleaning",
    priority: "medium",
    dueDate: "2025-06-17",
    completed: false,
    property: "Cozy Garden Apartment",
    createdAt: "2025-06-16",
  },
  {
    id: 3,
    title: "Respond to guest inquiry about WiFi",
    description: "Guest asking about WiFi password and connection issues",
    category: "guest",
    priority: "high",
    dueDate: "2025-06-16",
    completed: true,
    property: "Modern Loft Studio",
    createdAt: "2025-06-16",
  },
  {
    id: 4,
    title: "Update listing photos",
    description: "Take new photos of renovated kitchen",
    category: "marketing",
    priority: "low",
    dueDate: "2025-06-25",
    completed: false,
    property: "Seaside Villa",
    createdAt: "2025-06-14",
  },
  {
    id: 5,
    title: "Process monthly expenses",
    description: "Review and categorize all property-related expenses",
    category: "financial",
    priority: "medium",
    dueDate: "2025-06-30",
    completed: false,
    property: "All Properties",
    createdAt: "2025-06-10",
  },
];

function Tasks() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "other",
    priority: "medium",
    dueDate: "",
    property: "",
  });

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        ...newTask,
        completed: false,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setTasks([task, ...tasks]);
      setNewTask({
        title: "",
        description: "",
        category: "other",
        priority: "medium",
        dueDate: "",
        property: "",
      });
      setShowAddForm(false);
    }
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setNewTask({
      title: task.title,
      description: task.description,
      category: task.category,
      priority: task.priority,
      dueDate: task.dueDate,
      property: task.property,
    });
    setShowAddForm(true);
  };

  const handleUpdateTask = () => {
    if (newTask.title.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id ? { ...task, ...newTask } : task,
        ),
      );
      setEditingTask(null);
      setNewTask({
        title: "",
        description: "",
        category: "other",
        priority: "medium",
        dueDate: "",
        property: "",
      });
      setShowAddForm(false);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesCategory =
      filterCategory === "all" || task.category === filterCategory;
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "completed" && task.completed) ||
      (filterStatus === "pending" && !task.completed);
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.property.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date() && dueDate;
  };

  const isDueSoon = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };

  const getCategoryInfo = (categoryId) => {
    return (
      taskCategories.find((cat) => cat.id === categoryId) || taskCategories[5]
    );
  };

  const getPriorityInfo = (priorityId) => {
    return priorityLevels.find((p) => p.id === priorityId) || priorityLevels[1];
  };

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length,
    overdue: tasks.filter((t) => !t.completed && isOverdue(t.dueDate)).length,
    dueSoon: tasks.filter((t) => !t.completed && isDueSoon(t.dueDate)).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-4xl font-bold text-transparent">
              Task Management
            </h1>
            <p className="mt-2 text-gray-600">
              Keep track of your rental property tasks
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-primary/80 to-primary px-4 py-2 text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl"
            >
              <Plus size={20} />
              Add Task
            </button>
            <div className="rounded-full bg-gradient-to-r from-primary/80 to-primary p-3 shadow-lg">
              <Construction size={24} className="text-white" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-5">
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-lg">
            <div className="text-2xl font-bold text-gray-900">
              {taskStats.total}
            </div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-lg">
            <div className="text-2xl font-bold text-green-600">
              {taskStats.completed}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-lg">
            <div className="text-2xl font-bold text-blue-600">
              {taskStats.pending}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-lg">
            <div className="text-2xl font-bold text-red-600">
              {taskStats.overdue}
            </div>
            <div className="text-sm text-gray-600">Overdue</div>
          </div>
          <div className="rounded-lg border border-gray-100 bg-white p-4 shadow-lg">
            <div className="text-2xl font-bold text-orange-600">
              {taskStats.dueSoon}
            </div>
            <div className="text-sm text-gray-600">Due Soon</div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
          <div className="flex flex-col items-center gap-4 md:flex-row">
            <div className="flex flex-1 items-center gap-2">
              <Search size={20} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-400" />
              <select
                className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {taskCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Add/Edit Task Form */}
        {showAddForm && (
          <div className="mb-6 rounded-xl border border-gray-100 bg-white p-6 shadow-lg">
            <h3 className="mb-4 text-lg font-semibold">
              {editingTask ? "Edit Task" : "Add New Task"}
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTask.title}
                  onChange={(e) =>
                    setNewTask({ ...newTask, title: e.target.value })
                  }
                  placeholder="Enter task title"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                  value={newTask.description}
                  onChange={(e) =>
                    setNewTask({ ...newTask, description: e.target.value })
                  }
                  placeholder="Enter task description"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTask.category}
                  onChange={(e) =>
                    setNewTask({ ...newTask, category: e.target.value })
                  }
                >
                  {taskCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTask.priority}
                  onChange={(e) =>
                    setNewTask({ ...newTask, priority: e.target.value })
                  }
                >
                  {priorityLevels.map((priority) => (
                    <option key={priority.id} value={priority.id}>
                      {priority.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="date"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Property
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTask.property}
                  onChange={(e) =>
                    setNewTask({ ...newTask, property: e.target.value })
                  }
                  placeholder="Which property is this for?"
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <button
                onClick={editingTask ? handleUpdateTask : handleAddTask}
                className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
              >
                {editingTask ? "Update Task" : "Add Task"}
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingTask(null);
                  setNewTask({
                    title: "",
                    description: "",
                    category: "other",
                    priority: "medium",
                    dueDate: "",
                    property: "",
                  });
                }}
                className="rounded-lg bg-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-lg">
              <div className="mb-4 text-gray-400">
                <Circle size={48} className="mx-auto" />
              </div>
              <h3 className="mb-2 text-lg font-medium text-gray-900">
                No tasks found
              </h3>
              <p className="text-gray-600">
                {searchTerm ||
                filterCategory !== "all" ||
                filterStatus !== "all"
                  ? "Try adjusting your filters or search term"
                  : "Create your first task to get started"}
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const categoryInfo = getCategoryInfo(task.category);
              const priorityInfo = getPriorityInfo(task.priority);
              const CategoryIcon = categoryInfo.icon;

              return (
                <div
                  key={task.id}
                  className={`rounded-xl border bg-white p-6 shadow-lg transition-all duration-200 hover:shadow-xl ${
                    task.completed
                      ? "border-green-200 bg-green-50/30"
                      : isOverdue(task.dueDate)
                        ? "border-red-200 bg-red-50/30"
                        : isDueSoon(task.dueDate)
                          ? "border-orange-200 bg-orange-50/30"
                          : "border-gray-100"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <button
                      onClick={() => handleToggleComplete(task.id)}
                      className={`mt-1 transition-colors ${
                        task.completed
                          ? "text-green-500"
                          : "text-gray-300 hover:text-green-500"
                      }`}
                    >
                      {task.completed ? (
                        <CheckCircle2 size={24} />
                      ) : (
                        <Circle size={24} />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3
                            className={`mb-2 text-lg font-semibold ${
                              task.completed
                                ? "text-gray-500 line-through"
                                : "text-gray-900"
                            }`}
                          >
                            {task.title}
                          </h3>
                          {task.description && (
                            <p
                              className={`mb-3 text-sm ${
                                task.completed
                                  ? "text-gray-400"
                                  : "text-gray-600"
                              }`}
                            >
                              {task.description}
                            </p>
                          )}

                          <div className="mb-3 flex flex-wrap gap-2">
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${categoryInfo.color} text-white`}
                            >
                              <CategoryIcon size={12} />
                              {categoryInfo.name}
                            </span>
                            <span
                              className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${priorityInfo.color}`}
                            >
                              {priorityInfo.name}
                            </span>
                            {task.property && (
                              <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                                <Home size={12} />
                                {task.property}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            {task.dueDate && (
                              <div
                                className={`flex items-center gap-1 ${
                                  isOverdue(task.dueDate)
                                    ? "text-red-600"
                                    : isDueSoon(task.dueDate)
                                      ? "text-orange-600"
                                      : ""
                                }`}
                              >
                                <Calendar size={14} />
                                Due:{" "}
                                {new Date(task.dueDate).toLocaleDateString()}
                                {isOverdue(task.dueDate) && (
                                  <AlertCircle size={14} />
                                )}
                                {isDueSoon(task.dueDate) && <Clock size={14} />}
                              </div>
                            )}
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              Created:{" "}
                              {new Date(task.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>

                        <div className="ml-4 flex gap-2">
                          <button
                            onClick={() => handleEditTask(task)}
                            className="p-2 text-gray-400 transition-colors hover:text-blue-500"
                          >
                            <Edit3 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="p-2 text-gray-400 transition-colors hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Tasks;
