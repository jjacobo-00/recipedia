import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import RecipeCard from "./RecipeCard"

const MainContent = () => {
	const [recipes, setRecipes] = useState([])
	const [loading, setLoading] = useState(true)
	const [search, setSearch] = useState("")
	const [selectedCuisines, setSelectedCuisines] = useState([])
	const [selectedTags, setSelectedTags] = useState([])
	const [dropdownOpen, setDropdownOpen] = useState({ cuisine: false, tags: false })
	
	useEffect(() => {
		fetch("https://dummyjson.com/recipes?limit=100")
			.then((res) => res.json())
			.then((data) => {
				setRecipes(data.recipes)
				setLoading(false)
			})
			.catch((error) => {
				console.error("Error fetching recipes:", error)
				setLoading(false)
			})
	}, [])
	
	const allCuisines = Array.from(new Set(recipes.map((r) => r.cuisine))).sort()
	
	const toggleCuisine = (cuisine) => {
		const newSelected = selectedCuisines.includes(cuisine)
			? selectedCuisines.filter((c) => c !== cuisine)
			: [...selectedCuisines, cuisine]
		setSelectedCuisines(newSelected)
		
		const validTags = getFilteredTags(newSelected)
		setSelectedTags((prev) => prev.filter((t) => validTags.includes(t)))
	}
	
	const toggleTag = (tag) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		)
	}
	
	const getFilteredTags = (selectedCuisines) => {
		const recipesByCuisine =
			selectedCuisines.length === 0
				? recipes
				: recipes.filter((r) => selectedCuisines.includes(r.cuisine))
		
		return Array.from(new Set(recipesByCuisine.flatMap((r) => r.tags || []))).sort()
	}
	
	const visibleTags = getFilteredTags(selectedCuisines)
	
	const filteredRecipes = recipes.filter((recipe) => {
		const matchesSearch = recipe.name.toLowerCase().includes(search.toLowerCase())
		const matchesCuisine =
			selectedCuisines.length === 0 || selectedCuisines.includes(recipe.cuisine)
		const matchesTags =
			selectedTags.length === 0 || recipe.tags.some((tag) => selectedTags.includes(tag))
		
		return matchesSearch && matchesCuisine && matchesTags
	})
	
	return (
		<div className="w-full lg:w-[80%] mx-auto px-4 py-4 sm:px-6 sm:pt-6">
			<div className="flex-1 px-4 py-4 sm:px-6 sm:pt-6 min-h-screen">
				{/* Navbar */}
				<nav className="w-full px-4 py-4 mb-6">
					<div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
						{/* Logo */}
						<Link
							to="/"
							className="text-2xl sm:text-3xl font-bold text-[#2d3748] transition-transform duration-200 transform hover:scale-110"
						>
							recipedia
						</Link>
						
						{/* Filters + Search */}
						<div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
							{/* Cuisine Filter Button */}
							<div className="relative">
								<button
									onClick={() => setDropdownOpen((prev) => ({ ...prev, cuisine: !prev.cuisine }))}
									className="w-full sm:w-auto px-4 py-2 border rounded-md bg-white text-sm font-medium shadow-sm"
								>
									Filter by Cuisine
								</button>
								{dropdownOpen.cuisine && (
									<div className="absolute z-10 mt-2 w-56 max-h-60 overflow-auto bg-white border rounded-lg shadow-lg p-3 space-y-2">
										{allCuisines.map((cuisine) => (
											<label key={cuisine} className="flex items-center space-x-2 text-sm capitalize">
												<input
													type="checkbox"
													checked={selectedCuisines.includes(cuisine)}
													onChange={() => toggleCuisine(cuisine)}
													className="accent-blue-500"
												/>
												<span>{cuisine}</span>
											</label>
										))}
									</div>
								)}
							</div>
							
							{/* Tag Filter Button */}
							<div className="relative">
								<button
									onClick={() => setDropdownOpen((prev) => ({ ...prev, tags: !prev.tags }))}
									className="w-full sm:w-auto px-4 py-2 border rounded-md bg-white text-sm font-medium shadow-sm"
								>
									Filter by Tags
								</button>
								{dropdownOpen.tags && (
									<div className="absolute z-10 mt-2 w-56 max-h-60 overflow-auto bg-white border rounded-lg shadow-lg p-3 space-y-2">
										{visibleTags.map((tag) => (
											<label key={tag} className="flex items-center space-x-2 text-sm capitalize">
												<input
													type="checkbox"
													checked={selectedTags.includes(tag)}
													onChange={() => toggleTag(tag)}
													className="accent-blue-500"
												/>
												<span>{tag}</span>
											</label>
										))}
									</div>
								)}
							</div>
							
							{/* Search Box */}
							<div className="relative w-full sm:w-[250px]">
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <FontAwesomeIcon icon={faSearch} />
        </span>
								<input
									type="text"
									placeholder="Search recipes..."
									value={search}
									onChange={(e) => setSearch(e.target.value)}
									className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
								/>
							</div>
						</div>
					</div>
				</nav>
				
				{/* Recipes */}
				{loading ? (
					<p className="text-center text-gray-600">Loading recipes...</p>
				) : filteredRecipes.length === 0 ? (
					<p className="text-center text-gray-600">No matching recipes found.</p>
				) : (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredRecipes.map((recipe) => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default MainContent
