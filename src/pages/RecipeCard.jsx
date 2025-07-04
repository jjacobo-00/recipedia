// RecipeCard.jsx
import React, { useState } from "react"
import { Link } from "react-router-dom"

const RecipeCard = ({ recipe }) => {
	const [imageLoaded, setImageLoaded] = useState(false)
	
	return (
		<Link to={`/recipe/${recipe.id}`}>
			<div className="rounded-xl overflow-hidden shadow hover:shadow-lg transform hover:scale-[1.02] transition duration-300 border border-gray-100 bg-white">
				<div className="relative w-full h-40 sm:h-48 bg-gray-100">
					{!imageLoaded && (
						<div className="absolute inset-0 flex items-center justify-center">
							<div className="w-6 h-6 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
						</div>
					)}
					<img
						src={recipe.image}
						alt={recipe.name}
						className={`w-full h-full object-cover transition-opacity duration-500 ${
							imageLoaded ? "opacity-100" : "opacity-0"
						}`}
						onLoad={() => setImageLoaded(true)}
						loading="lazy"
					/>
				</div>
				<div className="p-4">
					<h2 className="text-lg font-semibold text-gray-800 truncate">
						{recipe.name}
					</h2>
					<div className="mt-2 flex items-center justify-between text-sm text-gray-500">
						<span>⏱ {recipe.cookTimeMinutes} mins</span>
						<span>🔥 {recipe.caloriesPerServing} cal</span>
					</div>
				</div>
			</div>
		</Link>
	)
}

export default RecipeCard
