import { Home, Book, PlusCircle, Album, Bookmark, Birdhouse } from 'lucide-react';
import { cn } from '../../utils/cn';
import React from 'react';

const NavItem = ({ id, icon: Icon, label, activeTab, onTabChange }) => (
	<button
		onClick={() => onTabChange(id)}
		className={cn(
			"flex flex-col items-center gap-1 px-3 py-3 rounded-2xl transition-all",
			activeTab === id ? "text-primary bg-primary/10" : "text-white hover:bg-surface-raised"
		)}
	>
		{React.createElement(Icon, { size:28 })}
		<span className="text-sm font-extrabold">{label}</span>
	</button>
);

export default function BottomNav({ activeTab, onTabChange, onAdd }) {
	return (
		<div className="fixed max-w-6xl mx-auto bottom-0 left-0 right-0 bg-surface/95 border-t border-white/5 pb-safe pt-2 px-6 flex justify-between items-center z-40 rounded-t-2xl py-2">
			<NavItem
				id="dashboard"
				icon={Birdhouse}
				label="Home"
				activeTab={activeTab}
				onTabChange={onTabChange}
			/>

			<button
				onClick={onAdd}
				className="bg-linear-to-br from-primary to-accent text-white p-4 rounded-xl shadow-lg shadow-primary/30"
			>
				<PlusCircle size={28} />
			</button>

			<NavItem
				id="books"
				icon={Bookmark}
				label="Books"
				activeTab={activeTab}
				onTabChange={onTabChange}
			/>
		</div>
	);
}
