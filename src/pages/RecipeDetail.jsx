import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const RecipeDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	
	const [recipe, setRecipe] = useState(null);
	const [loading, setLoading] = useState(true);
	const [imageLoaded, setImageLoaded] = useState(false);
	
	useEffect(() => {
		setLoading(true);
		fetch(`https://dummyjson.com/recipes/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setRecipe(data);
				setLoading(false);
			})
			.catch((error) => {
				console.error("Error fetching recipe:", error);
				setLoading(false);
			});
	}, [id]);
	
	if (loading) {
		return <p className="p-6 text-center text-gray-600">Loading recipe details...</p>;
	}
	
	if (!recipe) {
		return <p className="p-6 text-center text-red-500">Recipe not found.</p>;
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
			
			{/* Recipe Image */}
			<div className="relative w-full h-60 bg-gray-100 rounded-lg mb-4">
				{!imageLoaded && (
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-6 h-6 border-4 border-blue-300 border-t-transparent rounded-full animate-spin"></div>
					</div>
				)}
				<img
					src={recipe.image}
					alt={recipe.name}
					className={`w-full h-full object-cover rounded-lg transition-opacity duration-500 ${
						imageLoaded ? "opacity-100" : "opacity-0"
					}`}
					onLoad={() => setImageLoaded(true)}
				/>
			</div>
			
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
