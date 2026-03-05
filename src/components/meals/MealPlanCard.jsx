import { Trash2, Pencil, Check, X } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const MealPlanCard = ({ plan, onDelete, onUpdate, missingItems, lists, onAddMissing }) => {

const [editing, setEditing] = useState(false);
const [newName, setNewName] = useState(plan.meal_name);
const [showLists, setShowLists] = useState(false);

/* Sync name when plan updates */
useEffect(() => {
setNewName(plan.meal_name);
}, [plan.meal_name]);

const handleSave = () => {

if (!newName.trim()) {
toast.warning("Meal name cannot be empty");
return;
}

if (onUpdate) {
onUpdate(plan.id, newName.trim());
}

setEditing(false);

};

const handleCancel = () => {
setNewName(plan.meal_name);
setEditing(false);
};

const handleKeyDown = (e) => {
if (e.key === "Enter") handleSave();
if (e.key === "Escape") handleCancel();
};

const dateObj = new Date(plan.meal_date);

const day = dateObj.toLocaleDateString("en-US", {
weekday: "short",
});

const fullDate = dateObj.toLocaleDateString("en-US", {
month: "short",
day: "numeric",
year: "numeric",
});

return (

<div className="w-full bg-white dark:bg-[#1f2937] rounded-3xl shadow-md hover:shadow-2xl border border-orange-200 dark:border-gray-700 p-4 sm:p-6 transition-all duration-300">

<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

<div className="flex items-center gap-4 sm:gap-6">

<div className="min-w-[70px] bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-500/20 dark:to-orange-600/20 text-orange-600 dark:text-orange-400 font-bold px-4 py-3 rounded-2xl text-center shadow-sm">

<p className="text-xs tracking-wider">
{day.toUpperCase()}
</p>

<p className="text-lg leading-none">
{dateObj.getDate()}
</p>

</div>

<div className="flex-1">

{editing ? (

<input
value={newName}
onChange={(e) => setNewName(e.target.value)}
onKeyDown={handleKeyDown}
autoFocus
className="w-full px-3 py-2 rounded-xl border border-orange-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-400 outline-none dark:bg-gray-700 dark:text-white"
/>

) : (

<>

<p className="text-lg sm:text-2xl font-bold text-orange-600 dark:text-orange-400 capitalize break-words">
{plan.meal_name}
</p>

<p className="text-xs text-gray-500 mt-1">
{fullDate}
</p>

{missingItems && missingItems.length > 0 && (

<div className="mt-2 space-y-2">

<button
className="text-xs bg-orange-500 bg-orange-600 text-white px-4 py-1 rounded-lg"
onClick={() => setShowLists(prev => !prev)}

>

Add Missing Items </button>

{showLists && lists?.map(list => (

<button
key={list.id}
onClick={() => onAddMissing(list.id, plan.id)}
className="block text-xs border px-2 py-1 rounded"

>

Add to {list.title} </button>

))}

</div>

)}

</>

)}

</div>

</div>

<div className="flex items-center gap-4 sm:gap-5 justify-end">

{editing ? (

<>

<button
onClick={handleSave}
className="text-green-500 hover:scale-110 transition"

>

<Check size={20}/>
</button>

<button
onClick={handleCancel}
className="text-gray-500 hover:scale-110 transition"

>

<X size={20}/>
</button>

</>

) : (

<button
onClick={() => setEditing(true)}
className="text-blue-500 hover:scale-110 transition"

>

<Pencil size={20}/>
</button>

)}

<button
onClick={() => onDelete(plan.id)}
className="text-red-500 hover:scale-110 transition"

>

<Trash2 size={20}/>
</button>

</div>

</div>

</div>

);

};

export default MealPlanCard;
