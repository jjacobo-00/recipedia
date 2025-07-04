import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const RecipeDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [recipe, setRecipe] = useState(null);
	
	useEffect(() => {
		fetch(`https://dummyjson.com/recipes/${id}`)
			.then((res) => res.json())
			.then((data) => setRecipe(data));
	}, [id]);
	
	if (!recipe) {
		return <p className="p-6 text-gray-600">Loading...</p>;
	}
	
	return (
		<div className="p-6 max-w-2xl mx-auto min-h-screen">
			{/* Back Button */}
			<button
				onClick={() => navigate(-1)}
				className="mb-4 flex items-center text-blue-600 hover:text-blue-800 transition"
			>
				<FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
				Back
			</button>
			
			{/* Recipe Info */}
			<img
				src={recipe.image}
				alt={recipe.name}
				className="w-full h-60 object-cover rounded-lg mb-4"
			/>
			<h1 className="text-2xl font-bold text-gray-800 mb-2">{recipe.name}</h1>
			<p className="text-gray-500 mb-4">
				{recipe.cuisine} • {recipe.difficulty} • {recipe.caloriesPerServing} cal
			</p>
			
			<h2 className="text-xl font-semibold mt-4 mb-2">Ingredients</h2>
			<ul className="list-disc list-inside text-gray-700 space-y-1">
				{recipe.ingredients.map((item, idx) => (
					<li key={idx}>{item}</li>
				))}
			</ul>
			
			<h2 className="text-xl font-semibold mt-6 mb-2">Instructions</h2>
			<ol className="list-decimal list-inside text-gray-700 space-y-2">
				{recipe.instructions.map((step, idx) => (
					<li key={idx}>{step}</li>
				))}
			</ol>
		</div>
	);
};

export default RecipeDetail;