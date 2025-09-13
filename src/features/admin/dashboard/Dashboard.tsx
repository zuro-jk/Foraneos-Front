import { FaUsers, FaUtensils, FaChartLine, FaDollarSign, FaCalendarAlt, FaClock, FaShoppingCart, FaStar, FaSignOutAlt } from "react-icons/fa";
import { useAuthStore } from "../../../core/stores/authStore";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Datos estáticos para el dashboard
  const stats = {
    totalUsers: 1247,
    totalOrders: 89,
    totalRevenue: 12450,
    avgRating: 4.8,
    todayOrders: 23,
    pendingReservations: 8,
    monthlyGrowth: 15.3,
    popularDish: "Lomo Saltado",
    activeStaff: 12,
    tableOccupancy: 78
  };

  const salesData = [
    { day: "Lun", sales: 850 },
    { day: "Mar", sales: 920 },
    { day: "Mié", sales: 1100 },
    { day: "Jue", sales: 980 },
    { day: "Vie", sales: 1350 },
    { day: "Sáb", sales: 1800 },
    { day: "Dom", sales: 1650 }
  ];

  const topDishes = [
    { name: "Lomo Saltado", orders: 45, revenue: 1260 },
    { name: "Ceviche Peruano", orders: 38, revenue: 1140 },
    { name: "Pizza Margherita", orders: 32, revenue: 800 },
    { name: "Hamburguesa Clásica", orders: 28, revenue: 616 }
  ];

  const recentOrders = [
    { id: "#001", customer: "María García", items: "Lomo Saltado, Ceviche", total: 58, status: "Completado" },
    { id: "#002", customer: "Juan Pérez", items: "Pizza Margherita", total: 25, status: "En preparación" },
    { id: "#003", customer: "Ana López", items: "Hamburguesa, Limonada", total: 32, status: "Pendiente" },
    { id: "#004", customer: "Carlos Ruiz", items: "Tiramisú, Café", total: 22, status: "Completado" }
  ];

  const recentReservations = [
    { id: 1, name: "Roberto Silva", date: "2025-01-12", time: "19:30", guests: 4, table: "Mesa Interior" },
    { id: 2, name: "Elena Morales", date: "2025-01-12", time: "20:00", guests: 2, table: "Terraza" },
    { id: 3, name: "Diego Castro", date: "2025-01-13", time: "13:00", guests: 6, table: "Salón Privado" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completado": return "bg-green-100 text-green-800";
      case "En preparación": return "bg-yellow-100 text-yellow-800";
      case "Pendiente": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header con botón de logout */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard Administrativo</h1>
            <p className="text-gray-600">Bienvenido, {user?.name || 'Admin'}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
          >
            <FaSignOutAlt />
            Cerrar Sesión
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Usuarios</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
              </div>
              <FaUsers className="text-3xl text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pedidos Hoy</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayOrders}</p>
              </div>
              <FaShoppingCart className="text-3xl text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ingresos</p>
                <p className="text-2xl font-bold text-gray-900">S/ {stats.totalRevenue}</p>
              </div>
              <FaDollarSign className="text-3xl text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Calificación</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
              </div>
              <FaStar className="text-3xl text-purple-500" />
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-600">Reservas Pendientes</p>
            <p className="text-xl font-bold text-red-600">{stats.pendingReservations}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-600">Crecimiento Mensual</p>
            <p className="text-xl font-bold text-green-600">+{stats.monthlyGrowth}%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-600">Plato Popular</p>
            <p className="text-sm font-semibold text-gray-800">{stats.popularDish}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-600">Personal Activo</p>
            <p className="text-xl font-bold text-blue-600">{stats.activeStaff}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <p className="text-sm text-gray-600">Ocupación Mesas</p>
            <p className="text-xl font-bold text-orange-600">{stats.tableOccupancy}%</p>
          </div>
        </div>

        {/* Charts and Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaChartLine className="text-blue-500" />
              Ventas de la Semana
            </h3>
            <div className="space-y-3">
              {salesData.map((item) => (
                <div key={item.day} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{item.day}</span>
                  <div className="flex items-center gap-3 flex-1 mx-4">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${(item.sales / 2000) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold text-gray-800">S/ {item.sales}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Dishes */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaUtensils className="text-red-500" />
              Platos Más Vendidos
            </h3>
            <div className="space-y-3">
              {topDishes.map((dish) => (
                <div key={dish.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-800">{dish.name}</p>
                    <p className="text-sm text-gray-600">{dish.orders} pedidos</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">S/ {dish.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders and Reservations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaShoppingCart className="text-green-500" />
              Pedidos Recientes
            </h3>
            <div className="space-y-3">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">{order.id}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                    <p className="text-xs text-gray-500">{order.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">S/ {order.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reservations */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FaCalendarAlt className="text-purple-500" />
              Reservas Recientes
            </h3>
            <div className="space-y-3">
              {recentReservations.map((reservation) => (
                <div key={reservation.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{reservation.name}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt className="text-xs" />
                        {reservation.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        {reservation.time}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{reservation.table}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{reservation.guests} personas</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigate('/admin/products')}
              className="p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
            >
              <FaUtensils className="text-2xl" />
              <span className="font-semibold">Gestionar Menú</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/users')}
              className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
            >
              <FaUsers className="text-2xl" />
              <span className="font-semibold">Gestionar Usuarios</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/reports')}
              className="p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
            >
              <FaChartLine className="text-2xl" />
              <span className="font-semibold">Ver Reportes</span>
            </button>
            
            <button 
              onClick={() => navigate('/admin/reservations')}
              className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 flex flex-col items-center gap-2"
            >
              <FaCalendarAlt className="text-2xl" />
              <span className="font-semibold">Gestionar Reservas</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
