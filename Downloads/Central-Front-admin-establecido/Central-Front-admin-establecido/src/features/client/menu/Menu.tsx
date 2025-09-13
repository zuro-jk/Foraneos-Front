import { useState } from "react";
import { FaStar, FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";

interface Dish {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

interface CartItem extends Dish {
  quantity: number;
}

function Menu() {
  const categories = [
    "Todos",
    "Entradas",
    "Platos principales",
    "Postres",
    "Bebidas",
  ];

  const allDishes: Dish[] = [
    {
      id: 1,
      name: "Ceviche Peruano",
      category: "Entradas",
      description: "Pescado fresco, limón, cebolla, ají.",
      price: 30,
      rating: 5,
      image: "https://source.unsplash.com/400x300/?ceviche",
    },
    {
      id: 2,
      name: "Lomo Saltado",
      category: "Platos principales",
      description: "Carne de res, cebolla, tomate, papas fritas.",
      price: 28,
      rating: 4,
      image: "https://source.unsplash.com/400x300/?lomo",
    },
    {
      id: 3,
      name: "Pizza Margherita",
      category: "Platos principales",
      description: "Tomate, mozzarella, albahaca fresca.",
      price: 25,
      rating: 4,
      image: "https://source.unsplash.com/400x300/?pizza",
    },
    {
      id: 4,
      name: "Tiramisú",
      category: "Postres",
      description: "Postre italiano con café y mascarpone.",
      price: 18,
      rating: 5,
      image: "https://source.unsplash.com/400x300/?dessert",
    },
    {
      id: 5,
      name: "Limonada",
      category: "Bebidas",
      description: "Refrescante bebida natural de limón.",
      price: 10,
      rating: 4,
      image: "https://source.unsplash.com/400x300/?lemonade",
    },
    {
      id: 6,
      name: "Ensalada César",
      category: "Entradas",
      description: "Lechuga, pollo, queso parmesano y aderezo César.",
      price: 20,
      rating: 4,
      image: "https://source.unsplash.com/400x300/?salad",
    },
    {
      id: 7,
      name: "Hamburguesa Clásica",
      category: "Platos principales",
      description: "Carne, queso, lechuga, tomate y pan brioche.",
      price: 22,
      rating: 4,
      image: "https://source.unsplash.com/400x300/?burger",
    },
    {
      id: 8,
      name: "Brownie con Helado",
      category: "Postres",
      description: "Brownie de chocolate con helado de vainilla.",
      price: 16,
      rating: 5,
      image: "https://source.unsplash.com/400x300/?brownie",
    },
    {
      id: 9,
      name: "Jugo de Mango",
      category: "Bebidas",
      description: "Natural y fresco.",
      price: 12,
      rating: 4,
      image: "https://source.unsplash.com/400x300/?mango-juice",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const filteredDishes =
    selectedCategory === "Todos"
      ? allDishes
      : allDishes.filter((dish) => dish.category === selectedCategory);

  const addToCart = (dish: Dish) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === dish.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === dish.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === dishId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map(item =>
          item.id === dishId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prevCart.filter(item => item.id !== dishId);
    });
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const placeOrder = () => {
    setOrderPlaced(true);
    setCart([]);
    setShowCart(false);
    setTimeout(() => setOrderPlaced(false), 3000);
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-b from-red-50 to-amber-50 relative">
      <h2 className="text-5xl font-bold text-center text-red-700 mb-12">
        Nuestro Menú
      </h2>
      <p className="text-center text-gray-700 max-w-4xl mx-auto mb-12 text-lg">
        Explora nuestras deliciosas opciones y ordena tu plato favorito.
      </p>

      {/* Botón del carrito flotante */}
      <button
        onClick={() => setShowCart(!showCart)}
        className="fixed top-20 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
      >
        <FaShoppingCart className="text-xl" />
        {getTotalItems() > 0 && (
          <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
            {getTotalItems()}
          </span>
        )}
      </button>

      {/* Notificación de pedido realizado */}
      {orderPlaced && (
        <div className="fixed top-32 right-6 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 animate-bounce">
          ¡Pedido realizado con éxito! 🎉
        </div>
      )}

      {/* Botones de categoría */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              selectedCategory === cat
                ? "bg-red-600 text-white"
                : "bg-white text-red-600 border border-red-600 hover:bg-red-600 hover:text-white"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid de platos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {filteredDishes.map((dish) => (
          <div
            key={dish.name}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow flex flex-col"
          >
            <img
              src={dish.image}
              alt={dish.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-2xl font-bold text-red-700 mb-2">
                {dish.name}
              </h3>
              <p className="text-gray-600 mb-4 flex-1">{dish.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-semibold text-amber-500">
                  S/ {dish.price}
                </span>
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < dish.rating ? "text-yellow-400" : "text-gray-300"
                      } mr-1`}
                    />
                  ))}
                </div>
              </div>
              <button 
                onClick={() => addToCart(dish)}
                className="mt-4 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
              >
                <FaPlus className="text-sm" />
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Carrito lateral */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowCart(false)}>
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-red-700">Tu Pedido</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-red-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Tu carrito está vacío</p>
              ) : (
                <>
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 mb-4 p-4 bg-amber-50 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.name}</h4>
                        <p className="text-amber-600 font-bold">S/ {item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="bg-red-100 text-red-600 p-1 rounded-full hover:bg-red-200"
                        >
                          <FaMinus className="text-sm" />
                        </button>
                        <span className="font-semibold w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-green-100 text-green-600 p-1 rounded-full hover:bg-green-200"
                        >
                          <FaPlus className="text-sm" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-gray-800">Total:</span>
                      <span className="text-2xl font-bold text-red-600">S/ {getTotalPrice()}</span>
                    </div>
                    <button
                      onClick={placeOrder}
                      className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors font-semibold text-lg"
                    >
                      Realizar Pedido
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Menu;
