const DashboardHeader = ({ user }) => {
  return (
    <div className="
      relative
      rounded-3xl
      overflow-hidden
      shadow-2xl
      group
    ">
      <img
        src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
        className="
          w-full
          h-48 sm:h-56 md:h-64
          object-cover
          transition-transform duration-700
          group-hover:scale-105
        "
        alt="Dashboard"
      />

      {/* Gradient Overlay */}
      <div className="
        absolute inset-0
        bg-gradient-to-r
        from-black/70 via-black/50 to-black/40
        flex items-center
        px-6 sm:px-10
      ">
        <div>
          <h1 className="
            text-2xl sm:text-3xl md:text-4xl
            font-bold
            text-white
            tracking-wide
          ">
            Welcome back, {user?.name || "User"} 👋
          </h1>

          <p className="
            text-white/80
            mt-2
            text-sm sm:text-base
          ">
            Smart insights for your grocery planning
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;