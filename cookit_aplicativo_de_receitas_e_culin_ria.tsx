import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, Heart, Clock, Utensils, Flame, Sparkles, Plus, Trash2, 
  CheckCircle2, Circle, ChefHat, ShoppingBag, Filter, Play, Pause, 
  RotateCcw, BookOpen, Layers, X, Check, Share2, Award, ArrowRight
} from 'lucide-react';

// Sample initial recipes database
const INITIAL_RECIPES = [
  {
    id: '1',
    title: 'Panquecas Americanas Fofinhas',
    category: 'Café da Manhã',
    prepTime: 20,
    difficulty: 'Fácil',
    calories: 320,
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=800&q=80',
    description: 'Panquecas altas, macias e deliciosas, perfeitas para saborear no café da manhã com mel ou xarope de bordo.',
    isCustom: false,
    ingredients: [
      { name: 'Farinha de trigo', amount: 200, unit: 'g' },
      { name: 'Leite', amount: 250, unit: 'ml' },
      { name: 'Ovo', amount: 2, unit: 'unid' },
      { name: 'Açúcar', amount: 30, unit: 'g' },
      { name: 'Fermento em pó', amount: 10, unit: 'g' },
      { name: 'Manteiga derretida', amount: 30, unit: 'g' },
      { name: 'Pitada de sal', amount: 1, unit: 'pitada' }
    ],
    instructions: [
      'Em uma tigela grande, misture a farinha, o açúcar, o fermento e a pitada de sal.',
      'Em outro recipiente, bata ligeiramente os ovos e junte o leite e a manteiga derretida.',
      'Despeje os ingredientes líquidos sobre os secos e misture delicadamente com um fouet até obter uma massa homogênea.',
      'Aqueça uma frigideira antiaderente em fogo médio e unte levemente com um pouco de manteiga.',
      'Despeje pequenas porções de massa na frigideira e cozinhe até surgirem bolhas na superfície.',
      'Vire a panqueca e deixe dourar o outro lado por cerca de 1 a 2 minutos. Sirva aquecida com mel ou frutas.'
    ],
    tags: ['Doce', 'Rápido', 'Vegetariano']
  },
  {
    id: '2',
    title: 'Risoto de Cogumelos Shimeji',
    category: 'Almoço/Jantar',
    prepTime: 35,
    difficulty: 'Médio',
    calories: 450,
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1633964913295-ceb43826e7c9?auto=format&fit=crop&w=800&q=80',
    description: 'Risoto cremoso com cogumelos frescos salteados no alho e finalizado com bastante queijo parmesão.',
    isCustom: false,
    ingredients: [
      { name: 'Arroz Arbóreo', amount: 250, unit: 'g' },
      { name: 'Cogumelo Shimeji', amount: 200, unit: 'g' },
      { name: 'Caldo de legumes', amount: 800, unit: 'ml' },
      { name: 'Vinho branco seco', amount: 100, unit: 'ml' },
      { name: 'Cebola picada', amount: 1, unit: 'unid' },
      { name: 'Alho', amount: 2, unit: 'dentes' },
      { name: 'Queijo Parmesão ralado', amount: 80, unit: 'g' },
      { name: 'Manteiga', amount: 40, unit: 'g' },
      { name: 'Azeite de oliva', amount: 20, unit: 'ml' }
    ],
    instructions: [
      'Mantenha o caldo de legumes aquecido em uma panela separada em fogo baixo.',
      'Em uma frigideira, doure o alho no azeite e salteie os cogumelos shimeji por 5 minutos. Reserve.',
      'Em uma panela funda, refogue a cebola na metade da manteiga até ficar transparente.',
      'Adicione o arroz arbóreo e refogue por 2 minutos. Despeje o vinho branco e mexa até evaporar completamente.',
      'Vá adicionando o caldo quente aos poucos (uma concha de cada vez), mexendo sempre até o arroz ficar al dente.',
      'Desligue o fogo, misture os cogumelos, o restante da manteiga e o queijo parmesão. Tampe por 2 minutos antes de servir.'
    ],
    tags: ['Gourmet', 'Vegetariano', 'Italiana']
  },
  {
    id: '3',
    title: 'Frango Grelhado com Legumes no Forno',
    category: 'Fitness',
    prepTime: 30,
    difficulty: 'Fácil',
    calories: 380,
    rating: 4.7,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
    description: 'Peito de frango suculento marinado com ervas finas acompanhado de abobrinha, cenoura e tomate cereja assados.',
    isCustom: false,
    ingredients: [
      { name: 'Peito de Frango', amount: 500, unit: 'g' },
      { name: 'Abobrinha', amount: 1, unit: 'unid' },
      { name: 'Cenoura', amount: 1, unit: 'unid' },
      { name: 'Tomate Cereja', amount: 150, unit: 'g' },
      { name: 'Azeite de oliva', amount: 30, unit: 'ml' },
      { name: 'Alecrim e Tomilho', amount: 10, unit: 'g' },
      { name: 'Alho', amount: 3, unit: 'dentes' },
      { name: 'Sal e Pimenta', amount: 5, unit: 'g' }
    ],
    instructions: [
      'Corte o peito de frango em bifes médios ou cubos grandes e tempere com alho, sal, pimenta e ervas.',
      'Pique a abobrinha e a cenoura em rodelas macias.',
      'Em uma assadeira, disponha os legumes e os tomates cereja. Regue com azeite e tempere.',
      'Coloque o frango junto aos legumes e leve ao forno pré-aquecido a 200°C por 25 minutos.',
      'Sirva quente com uma salada verde folhosa.'
    ],
    tags: ['Low Carb', 'Saudável', 'Rico em Proteína']
  },
  {
    id: '4',
    title: 'Brownie Super Chocolatudo',
    category: 'Sobremesas',
    prepTime: 40,
    difficulty: 'Fácil',
    calories: 410,
    rating: 4.95,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=800&q=80',
    description: 'Brownie com casquinha crocante por fora e massa densa e extremamente cremosa por dentro.',
    isCustom: false,
    ingredients: [
      { name: 'Chocolate meio amargo', amount: 200, unit: 'g' },
      { name: 'Manteiga', amount: 150, unit: 'g' },
      { name: 'Ovo', amount: 3, unit: 'unid' },
      { name: 'Açúcar', amount: 200, unit: 'g' },
      { name: 'Farinha de trigo', amount: 100, unit: 'g' },
      { name: 'Cacau em pó', amount: 30, unit: 'g' },
      { name: 'Pitada de sal', amount: 1, unit: 'pitada' }
    ],
    instructions: [
      'Derreta o chocolate com a manteiga em banho-maria ou no micro-ondas de 30 em 30 segundos.',
      'Em uma tigela, bata bem os ovos com o açúcar até formar um creme claro.',
      'Misture o chocolate derretido aos ovos batidos.',
      'Peneire a farinha, o cacau em pó e o sal sobre a mistura e mexa suavemente até incorporar.',
      'Despeje em uma forma untada e forrada com papel manteiga.',
      'Asse em forno pré-aquecido a 180°C por cerca de 25 a 30 minutos (o centro deve continuar levemente úmido).'
    ],
    tags: ['Chocolates', 'Sobremesa', 'Festa']
  },
  {
    id: '5',
    title: 'Salada Buddha Bowl Vegana',
    category: 'Vegano',
    prepTime: 15,
    difficulty: 'Fácil',
    calories: 290,
    rating: 4.6,
    reviewsCount: 75,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    description: 'Tigela nutritiva e colorida cheia de grão-de-bico assado, abacate, quinoa e molho de tahine cremoso.',
    isCustom: false,
    ingredients: [
      { name: 'Grão-de-bico cozido', amount: 200, unit: 'g' },
      { name: 'Quinoa cozida', amount: 150, unit: 'g' },
      { name: 'Abacate', amount: 1, unit: 'unid' },
      { name: 'Espinafre fresco', amount: 80, unit: 'g' },
      { name: 'Cenoura ralada', amount: 1, unit: 'unid' },
      { name: 'Tahine', amount: 30, unit: 'ml' },
      { name: 'Suco de Limão', amount: 15, unit: 'ml' }
    ],
    instructions: [
      'Monte a base da tigela com o espinafre fresco e a quinoa cozida.',
      'Disponha o grão-de-bico assado, a cenoura ralada e as fatias de abacate ao redor.',
      'Em um pequeno recipiente, misture o tahine com o suco de limão e um pouco de água morna para formar o molho.',
      'Regue a tigela com o molho e sirva imediatamente.'
    ],
    tags: ['Vegano', 'Fit', 'Sem Glúten']
  },
  {
    id: '6',
    title: 'Sanduíche Caprese no Pão Italiano',
    category: 'Lanches',
    prepTime: 10,
    difficulty: 'Fácil',
    calories: 340,
    rating: 4.75,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
    description: 'Sanduíche refrescante com mussarela de búfala fresca, tomates maduros e pestos artesanais de manjericão.',
    isCustom: false,
    ingredients: [
      { name: 'Pão Italiano ou Ciabatta', amount: 2, unit: 'fatias' },
      { name: 'Mussarela de Búfala', amount: 120, unit: 'g' },
      { name: 'Tomate', amount: 1, unit: 'unid' },
      { name: 'Molho Pesto', amount: 30, unit: 'g' },
      { name: 'Folhas de Manjericão', amount: 10, unit: 'g' },
      { name: 'Azeite de oliva', amount: 10, unit: 'ml' }
    ],
    instructions: [
      'Toste levemente as fatias de pão no forno ou na frigideira.',
      'Passe uma generosa camada de molho pesto nas fatias.',
      'Corte o tomate e a mussarela em fatias médias.',
      'Monte o sanduíche alternando fatias de tomate e mussarela de búfala.',
      'Finalize com folhas de manjericão fresco e um fio de azeite extra virgem.'
    ],
    tags: ['Rápido', 'Vegetariano', 'Prático']
  }
];

const CATEGORIES = ['Todas', 'Café da Manhã', 'Almoço/Jantar', 'Sobremesas', 'Lanches', 'Vegano', 'Fitness'];

const COMMON_INGREDIENTS = [
  'Ovo', 'Leite', 'Farinha de trigo', 'Açúcar', 'Manteiga', 'Peito de Frango', 
  'Arroz Arbóreo', 'Tomate', 'Queijo Parmesão', 'Cebola', 'Alho', 'Azeite de oliva',
  'Chocolate meio amargo', 'Abacate', 'Grão-de-bico', 'Cenoura', 'Abobrinha'
];

export default function App() {
  // Navigation & View State
  const [activeTab, setActiveTab] = useState('explorar'); // 'explorar' | 'geladeira' | 'favoritos' | 'compras'
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [maxTime, setMaxTime] = useState(120);

  // Fridge Pantry State
  const [fridgePantry, setFridgePantry] = useState(['Ovo', 'Leite', 'Farinha de trigo']);
  const [ingredientInput, setIngredientInput] = useState('');

  // Modals state
  const [isNewRecipeModalOpen, setIsNewRecipeModalOpen] = useState(false);

  // Dynamic Portion Servings State for Modal
  const [servings, setServings] = useState(4);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Timer State
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Initialize Data from LocalStorage
  useEffect(() => {
    const savedRecipes = localStorage.getItem('cookit_custom_recipes');
    if (savedRecipes) {
      try {
        const parsed = JSON.parse(savedRecipes);
        setRecipes([...INITIAL_RECIPES, ...parsed]);
      } catch (e) {
        setRecipes(INITIAL_RECIPES);
      }
    } else {
      setRecipes(INITIAL_RECIPES);
    }

    const savedFavs = localStorage.getItem('cookit_favorites');
    if (savedFavs) {
      try { setFavorites(JSON.parse(savedFavs)); } catch (e) {}
    }

    const savedShop = localStorage.getItem('cookit_shopping');
    if (savedShop) {
      try { setShoppingList(JSON.parse(savedShop)); } catch (e) {}
    }
  }, []);

  // Save changes to localStorage
  const saveCustomRecipesToStorage = (newRecipeList) => {
    const customOnly = newRecipeList.filter(r => r.isCustom);
    localStorage.setItem('cookit_custom_recipes', JSON.stringify(customOnly));
  };

  const toggleFavorite = (recipeId, e) => {
    if (e) e.stopPropagation();
    let updated;
    if (favorites.includes(recipeId)) {
      updated = favorites.filter(id => id !== recipeId);
    } else {
      updated = [...favorites, recipeId];
    }
    setFavorites(updated);
    localStorage.setItem('cookit_favorites', JSON.stringify(updated));
  };

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const startTimer = (minutes) => {
    setTimerSeconds(minutes * 60);
    setIsTimerRunning(true);
  };

  const formatTimerTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Filtering Logic
  const filteredRecipes = useMemo(() => {
    return recipes.filter(recipe => {
      const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'Todas' || recipe.category === selectedCategory;
      const matchesTime = recipe.prepTime <= maxTime;

      return matchesSearch && matchesCategory && matchesTime;
    });
  }, [recipes, searchQuery, selectedCategory, maxTime]);

  // Fridge Matcher Logic
  const fridgeMatches = useMemo(() => {
    if (fridgePantry.length === 0) return [];

    return recipes.map(recipe => {
      const recipeIngNames = recipe.ingredients.map(i => i.name.toLowerCase());
      const matched = recipeIngNames.filter(ing => 
        fridgePantry.some(pantryItem => ing.includes(pantryItem.toLowerCase()))
      );

      const matchPercentage = Math.round((matched.length / recipeIngNames.length) * 100);

      return {
        recipe,
        matchedCount: matched.length,
        totalIngredients: recipeIngNames.length,
        matchPercentage
      };
    }).filter(item => item.matchedCount > 0).sort((a, b) => b.matchPercentage - a.matchPercentage);
  }, [recipes, fridgePantry]);

  // Add Recipe to Shopping List
  const addIngredientsToShoppingList = (recipe, scaleFactor = 1) => {
    const newItems = recipe.ingredients.map(ing => ({
      id: Date.now() + Math.random(),
      name: ing.name,
      amount: Math.round(ing.amount * scaleFactor * 10) / 10,
      unit: ing.unit,
      recipeName: recipe.title,
      checked: false
    }));

    const updated = [...shoppingList, ...newItems];
    setShoppingList(updated);
    localStorage.setItem('cookit_shopping', JSON.stringify(updated));
  };

  // Open Detailed Recipe Modal
  const openRecipeDetails = (recipe) => {
    setSelectedRecipe(recipe);
    setServings(4); // default 4 portions
    setCompletedSteps([]);
  };

  // Add New Custom Recipe
  const handleCreateRecipe = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    const ingredientsText = formData.get('ingredientsRaw');
    const parsedIngredients = ingredientsText.split('\n').filter(line => line.trim() !== '').map(line => {
      const parts = line.split('-');
      return {
        name: parts[0]?.trim() || line.trim(),
        amount: parts[1] ? parseFloat(parts[1]) || 1 : 1,
        unit: parts[2]?.trim() || 'unid'
      };
    });

    const instructionsText = formData.get('instructionsRaw');
    const parsedInstructions = instructionsText.split('\n').filter(line => line.trim() !== '');

    const newRec = {
      id: Date.now().toString(),
      title: formData.get('title'),
      category: formData.get('category'),
      prepTime: parseInt(formData.get('prepTime')) || 25,
      difficulty: formData.get('difficulty'),
      calories: parseInt(formData.get('calories')) || 350,
      rating: 5.0,
      reviewsCount: 1,
      image: formData.get('image') || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80',
      description: formData.get('description'),
      isCustom: true,
      ingredients: parsedIngredients.length > 0 ? parsedIngredients : [{ name: 'Ingrediente básico', amount: 1, unit: 'unid' }],
      instructions: parsedInstructions.length > 0 ? parsedInstructions : ['Misture tudo e sirva.'],
      tags: ['Personalizado', formData.get('category')]
    };

    const updated = [newRec, ...recipes];
    setRecipes(updated);
    saveCustomRecipesToStorage(updated);
    setIsNewRecipeModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] text-slate-800 font-sans flex flex-col pb-16 md:pb-0">
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('explorar')}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF6B4A] to-[#FF8E75] flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-900 leading-none">
                Cook<span className="text-[#FF6B4A]">It</span>
              </h1>
              <p className="text-xs font-semibold text-slate-400 tracking-wider uppercase mt-1">Seu Guia Culinário</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
            <button
              onClick={() => setActiveTab('explorar')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === 'explorar' 
                  ? 'bg-white text-[#FF6B4A] shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Utensils className="w-4 h-4" />
              Explorar
            </button>
            <button
              onClick={() => setActiveTab('geladeira')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === 'geladeira' 
                  ? 'bg-white text-[#FF6B4A] shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              Na Geladeira
            </button>
            <button
              onClick={() => setActiveTab('favoritos')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === 'favoritos' 
                  ? 'bg-white text-[#FF6B4A] shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
              Favoritos
              {favorites.length > 0 && (
                <span className="ml-1 bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {favorites.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('compras')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === 'compras' 
                  ? 'bg-white text-[#FF6B4A] shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-emerald-500" />
              Lista de Compras
              {shoppingList.length > 0 && (
                <span className="ml-1 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {shoppingList.filter(i => !i.checked).length}
                </span>
              )}
            </button>
          </nav>

          {/* Action Button */}
          <button
            onClick={() => setIsNewRecipeModalOpen(true)}
            className="flex items-center gap-2 bg-[#FF6B4A] hover:bg-[#e55938] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md shadow-orange-500/20 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Criar Receita</span>
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER CONTENT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* TAB 1: EXPLORAR RECETAS */}
        {activeTab === 'explorar' && (
          <div className="space-y-8">
            
            {/* HERO BANNER */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-12 shadow-xl">
              <div className="absolute -right-10 -bottom-10 opacity-20 pointer-events-none">
                <ChefHat className="w-96 h-96 text-white" />
              </div>
              <div className="relative z-10 max-w-2xl space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5" /> Descubra novos sabores
                </span>
                <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  O que você quer cozinhar hoje?
                </h2>
                <p className="text-slate-300 text-base sm:text-lg">
                  Explore centenas de receitas simples, rápidas e irresistíveis para qualquer ocasião.
                </p>

                {/* SEARCH BAR */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Busque por nome, ingrediente ou tag..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B4A] transition-all"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* CATEGORY & TIME FILTERS */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
              
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#FF6B4A] text-white shadow-md shadow-orange-500/20'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Prep Time Slider */}
              <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm">
                <Clock className="w-4 h-4 text-[#FF6B4A]" />
                <span className="font-semibold text-slate-700 whitespace-nowrap">Tempo max:</span>
                <input
                  type="range"
                  min="10"
                  max="120"
                  step="5"
                  value={maxTime}
                  onChange={(e) => setMaxTime(Number(e.target.value))}
                  className="w-24 sm:w-32 accent-[#FF6B4A]"
                />
                <span className="font-bold text-[#FF6B4A] min-w-[55px]">{maxTime} min</span>
              </div>
            </div>

            {/* RECIPES GRID */}
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => {
                  const isFav = favorites.includes(recipe.id);
                  return (
                    <div
                      key={recipe.id}
                      onClick={() => openRecipeDetails(recipe)}
                      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
                    >
                      {/* Image Header */}
                      <div className="relative h-52 overflow-hidden bg-slate-100">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        
                        {/* Category Badge */}
                        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                          {recipe.category}
                        </span>

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => toggleFavorite(recipe.id, e)}
                          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-700 hover:text-rose-500 transition-colors shadow-sm"
                        >
                          <Heart className={`w-5 h-5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>

                        {/* Rating Badge */}
                        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
                          <span className="text-amber-400">★</span>
                          <span>{recipe.rating}</span>
                          <span className="text-slate-300">({recipe.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Recipe Info */}
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#FF6B4A] transition-colors line-clamp-1">
                            {recipe.title}
                          </h3>
                          <p className="text-slate-500 text-sm mt-1 line-clamp-2">
                            {recipe.description}
                          </p>
                        </div>

                        {/* Metadata Footer */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{recipe.prepTime} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Flame className="w-3.5 h-3.5 text-amber-500" />
                            <span>{recipe.calories} kcal</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5 text-slate-400" />
                            <span>{recipe.difficulty}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
                <ChefHat className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800">Nenhuma receita encontrada</h3>
                <p className="text-slate-500 mt-1 max-w-md mx-auto">
                  Tente alterar seus termos de busca ou filtros de categoria e tempo de preparo.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('Todas'); setMaxTime(120); }}
                  className="mt-4 px-5 py-2.5 bg-[#FF6B4A] text-white rounded-full font-bold text-sm hover:bg-[#e55938] transition-all"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: NA GELADEIRA (FRIDGE MATCH) */}
        {activeTab === 'geladeira' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-200/70 rounded-3xl p-6 sm:p-8">
              <div className="max-w-2xl space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Assistente Inteligente
                </span>
                <h2 className="text-3xl font-black text-slate-900">O que tem na sua geladeira?</h2>
                <p className="text-slate-600 text-sm sm:text-base">
                  Selecione ou digite os ingredientes que você tem em casa. O CookIt vai calcular quais receitas você consegue fazer agora mesmo!
                </p>
              </div>

              {/* Ingredient Selector Box */}
              <div className="mt-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {fridgePantry.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 bg-white text-slate-800 border border-orange-200 px-3.5 py-1.5 rounded-full text-sm font-bold shadow-sm"
                    >
                      {item}
                      <button
                        onClick={() => setFridgePantry(fridgePantry.filter(i => i !== item))}
                        className="hover:text-rose-500 text-slate-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  ))}
                  {fridgePantry.length === 0 && (
                    <p className="text-slate-400 text-sm italic">Nenhum ingrediente selecionado.</p>
                  )}
                </div>

                {/* Input Add */}
                <div className="flex gap-2 max-w-md">
                  <input
                    type="text"
                    placeholder="Adicionar ingrediente (ex: Queijo, Tomate)..."
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && ingredientInput.trim()) {
                        setFridgePantry([...fridgePantry, ingredientInput.trim()]);
                        setIngredientInput('');
                      }
                    }}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B4A]"
                  />
                  <button
                    onClick={() => {
                      if (ingredientInput.trim()) {
                        setFridgePantry([...fridgePantry, ingredientInput.trim()]);
                        setIngredientInput('');
                      }
                    }}
                    className="px-4 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800"
                  >
                    Adicionar
                  </button>
                </div>

                {/* Quick Add Suggestions */}
                <div className="pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sugestões Rápidas:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {COMMON_INGREDIENTS.filter(i => !fridgePantry.includes(i)).slice(0, 8).map(ing => (
                      <button
                        key={ing}
                        onClick={() => setFridgePantry([...fridgePantry, ing])}
                        className="text-xs font-medium bg-white/80 hover:bg-white text-slate-600 border border-slate-200 px-2.5 py-1 rounded-lg transition-colors"
                      >
                        + {ing}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* MATCHED RESULTS */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <ChefHat className="w-5 h-5 text-[#FF6B4A]" />
                Receitas Compatíveis ({fridgeMatches.length})
              </h3>

              {fridgeMatches.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {fridgeMatches.map(({ recipe, matchedCount, totalIngredients, matchPercentage }) => (
                    <div
                      key={recipe.id}
                      onClick={() => openRecipeDetails(recipe)}
                      className="bg-white p-5 rounded-2xl border border-slate-200 hover:shadow-lg transition-all flex gap-4 cursor-pointer"
                    >
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover"
                      />
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-bold text-[#FF6B4A] uppercase tracking-wider">{recipe.category}</span>
                            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                              {matchPercentage}% dos ingredientes
                            </span>
                          </div>
                          <h4 className="font-bold text-slate-900 mt-1 line-clamp-1">{recipe.title}</h4>
                          <p className="text-slate-500 text-xs mt-1">
                            Você tem {matchedCount} de {totalIngredients} ingredientes necessários.
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs font-medium text-slate-500 mt-2">
                          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {recipe.prepTime}m</span>
                          <span className="flex items-center gap-1"><Flame className="w-3.5 h-3.5" /> {recipe.calories} cal</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                  <p className="text-slate-500">Adicione ingredientes acima para ver quais receitas você pode fazer!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: FAVORITOS */}
        {activeTab === 'favoritos' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Suas Receitas Favoritas</h2>
                <p className="text-slate-500 text-sm mt-1">Todas as receitas que você salvou em um só lugar.</p>
              </div>
            </div>

            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.filter(r => favorites.includes(r.id)).map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => openRecipeDetails(recipe)}
                    className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all flex flex-col cursor-pointer"
                  >
                    <div className="relative h-48">
                      <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover" />
                      <button
                        onClick={(e) => toggleFavorite(recipe.id, e)}
                        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-rose-500"
                      >
                        <Heart className="w-5 h-5 fill-rose-500" />
                      </button>
                    </div>
                    <div className="p-5">
                      <h3 className="font-bold text-slate-900 text-lg">{recipe.title}</h3>
                      <p className="text-slate-500 text-sm mt-1 line-clamp-2">{recipe.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
                <Heart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800">Sua lista de favoritos está vazia</h3>
                <p className="text-slate-500 mt-1">Clique no coração de qualquer receita para guardá-la aqui.</p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: LISTA DE COMPRAS */}
        {activeTab === 'compras' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-slate-900">Lista de Compras</h2>
                <p className="text-slate-500 text-sm mt-1">Organize os ingredientes que precisa comprar no mercado.</p>
              </div>
              {shoppingList.length > 0 && (
                <button
                  onClick={() => { setShoppingList([]); localStorage.removeItem('cookit_shopping'); }}
                  className="text-xs text-rose-600 font-bold hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200"
                >
                  Limpar Lista
                </button>
              )}
            </div>

            {shoppingList.length > 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200 divide-y divide-slate-100 shadow-sm overflow-hidden">
                {shoppingList.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 flex items-center justify-between gap-4 transition-colors ${
                      item.checked ? 'bg-slate-50/70' : 'hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          const updated = shoppingList.map(i => i.id === item.id ? { ...i, checked: !i.checked } : i);
                          setShoppingList(updated);
                          localStorage.setItem('cookit_shopping', JSON.stringify(updated));
                        }}
                        className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                          item.checked 
                            ? 'bg-emerald-500 border-emerald-500 text-white' 
                            : 'border-slate-300 text-transparent hover:border-emerald-500'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <div>
                        <span className={`font-semibold text-base ${item.checked ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                          {item.name}
                        </span>
                        <p className="text-xs text-slate-400">Origem: {item.recipeName}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-bold bg-slate-100 text-slate-700 px-3 py-1 rounded-lg">
                        {item.amount} {item.unit}
                      </span>
                      <button
                        onClick={() => {
                          const updated = shoppingList.filter(i => i.id !== item.id);
                          setShoppingList(updated);
                          localStorage.setItem('cookit_shopping', JSON.stringify(updated));
                        }}
                        className="text-slate-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
                <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-800">Sua lista está vazia</h3>
                <p className="text-slate-500 mt-1 max-w-sm mx-auto">
                  Abra uma receita e clique em "Adicionar à Lista de Compras" para enviar os ingredientes para cá.
                </p>
              </div>
            )}
          </div>
        )}

      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-2 z-40 flex justify-around items-center">
        <button
          onClick={() => setActiveTab('explorar')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'explorar' ? 'text-[#FF6B4A]' : 'text-slate-400'}`}
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[10px] font-bold">Explorar</span>
        </button>
        <button
          onClick={() => setActiveTab('geladeira')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'geladeira' ? 'text-[#FF6B4A]' : 'text-slate-400'}`}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px] font-bold">Geladeira</span>
        </button>
        <button
          onClick={() => setActiveTab('favoritos')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'favoritos' ? 'text-[#FF6B4A]' : 'text-slate-400'}`}
        >
          <Heart className="w-5 h-5" />
          <span className="text-[10px] font-bold">Favoritos</span>
        </button>
        <button
          onClick={() => setActiveTab('compras')}
          className={`flex flex-col items-center gap-1 ${activeTab === 'compras' ? 'text-[#FF6B4A]' : 'text-slate-400'}`}
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="text-[10px] font-bold">Compras</span>
        </button>
      </div>

      {/* DETAILED RECIPE MODAL */}
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
            
            {/* Close Floating Button */}
            <button
              onClick={() => setSelectedRecipe(null)}
              className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content Scrollable */}
            <div className="overflow-y-auto flex-1">
              
              {/* Header Image */}
              <div className="relative h-64 sm:h-80">
                <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                  <span className="bg-[#FF6B4A] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {selectedRecipe.category}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-black">{selectedRecipe.title}</h2>
                  <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200 font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-orange-400" /> {selectedRecipe.prepTime} min</span>
                    <span className="flex items-center gap-1"><Flame className="w-4 h-4 text-amber-400" /> {selectedRecipe.calories} kcal</span>
                    <span className="flex items-center gap-1"><Layers className="w-4 h-4 text-slate-300" /> {selectedRecipe.difficulty}</span>
                    <span className="flex items-center gap-1 text-amber-400">★ {selectedRecipe.rating}</span>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 sm:p-8 space-y-8">
                
                {/* Description & Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed flex-1">
                    {selectedRecipe.description}
                  </p>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addIngredientsToShoppingList(selectedRecipe, servings / 4)}
                      className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      + Lista de Compras
                    </button>
                  </div>
                </div>

                {/* TIMER WIDGET (IF ACTIVE) */}
                {timerSeconds > 0 && (
                  <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="w-6 h-6 text-[#FF6B4A] animate-pulse" />
                      <div>
                        <p className="text-xs text-slate-400 font-bold uppercase">Timer Culinário</p>
                        <p className="text-2xl font-black font-mono text-[#FF6B4A]">{formatTimerTime(timerSeconds)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsTimerRunning(!isTimerRunning)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-xl"
                      >
                        {isTimerRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>
                      <button
                        onClick={() => setTimerSeconds(0)}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-rose-400"
                      >
                        <RotateCcw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* INGREDIENTS SECTION WITH PORTION SCALER */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <Utensils className="w-5 h-5 text-[#FF6B4A]" />
                      Ingredientes
                    </h3>

                    {/* Portion Scaler */}
                    <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
                      <span className="text-xs font-bold text-slate-500 px-2">Porções:</span>
                      {[2, 4, 6, 8].map((num) => (
                        <button
                          key={num}
                          onClick={() => setServings(num)}
                          className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                            servings === num ? 'bg-[#FF6B4A] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedRecipe.ingredients.map((ing, idx) => {
                      const scaledAmount = Math.round((ing.amount * (servings / 4)) * 10) / 10;
                      return (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-slate-700 text-sm font-medium">{ing.name}</span>
                          <span className="text-slate-900 font-bold text-sm bg-white px-2.5 py-1 rounded-md border border-slate-200">
                            {scaledAmount} {ing.unit}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* INSTRUCTIONS & STEP-BY-STEP TRACKER */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-[#FF6B4A]" />
                      Modo de Preparo Passo a Passo
                    </h3>
                    <button
                      onClick={() => startTimer(selectedRecipe.prepTime)}
                      className="flex items-center gap-1.5 text-xs font-bold text-[#FF6B4A] bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg border border-orange-200"
                    >
                      <Clock className="w-3.5 h-3.5" /> Iniciar Timer ({selectedRecipe.prepTime}m)
                    </button>
                  </div>

                  <div className="space-y-3">
                    {selectedRecipe.instructions.map((step, idx) => {
                      const isCompleted = completedSteps.includes(idx);
                      return (
                        <div
                          key={idx}
                          onClick={() => {
                            if (isCompleted) {
                              setCompletedSteps(completedSteps.filter(s => s !== idx));
                            } else {
                              setCompletedSteps([...completedSteps, idx]);
                            }
                          }}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex gap-4 ${
                            isCompleted 
                              ? 'bg-emerald-50/60 border-emerald-200 text-slate-400' 
                              : 'bg-white border-slate-200 text-slate-800 hover:border-orange-300'
                          }`}
                        >
                          <button className="mt-0.5">
                            {isCompleted ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-100" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-300" />
                            )}
                          </button>
                          <div className="flex-1">
                            <span className="text-xs font-bold text-[#FF6B4A] uppercase tracking-wider block mb-1">Passo {idx + 1}</span>
                            <p className={`text-sm leading-relaxed ${isCompleted ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                              {step}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE NEW RECIPE MODAL */}
      {isNewRecipeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl relative my-auto">
            <button
              onClick={() => setIsNewRecipeModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900">Cadastrar Nova Receita</h2>
              <p className="text-slate-500 text-sm">Adicione suas próprias receitas e salve no navegador.</p>
            </div>

            <form onSubmit={handleCreateRecipe} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Título da Receita</label>
                <input
                  required
                  name="title"
                  type="text"
                  placeholder="Ex: Torta de Maçã da Vovó"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#FF6B4A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Categoria</label>
                  <select name="category" className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-white">
                    {CATEGORIES.filter(c => c !== 'Todas').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Tempo (min)</label>
                  <input
                    required
                    name="prepTime"
                    type="number"
                    defaultValue="30"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Dificuldade</label>
                  <select name="difficulty" className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-white">
                    <option value="Fácil">Fácil</option>
                    <option value="Médio">Médio</option>
                    <option value="Difícil">Difícil</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">URL da Imagem (opcional)</label>
                <input
                  name="image"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#FF6B4A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Descrição Curta</label>
                <input
                  required
                  name="description"
                  type="text"
                  placeholder="Resumo apetitoso do prato..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#FF6B4A] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Ingredientes (Um por linha no formato: Nome - Quantidade - Unidade)
                </label>
                <textarea
                  required
                  name="ingredientsRaw"
                  rows="3"
                  placeholder="Farinha de trigo - 200 - g&#10;Ovo - 2 - unid&#10;Leite - 100 - ml"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm font-mono focus:ring-2 focus:ring-[#FF6B4A] focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
                  Modo de Preparo (Instrução por linha)
                </label>
                <textarea
                  required
                  name="instructionsRaw"
                  rows="3"
                  placeholder="Misture os ingredientes secos.&#10;Adicione o leite e os ovos.&#10;Asse por 30 minutos."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#FF6B4A] focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsNewRecipeModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-bold text-sm hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#FF6B4A] text-white font-bold text-sm hover:bg-[#e55938] shadow-md"
                >
                  Salvar Receita
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}