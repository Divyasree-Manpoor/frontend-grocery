const RecentActivity = ({ activity }) => {
return (
<div
className="
bg-white
dark:bg-gray-900


    p-6 sm:p-8

    rounded-3xl

    border
    border-gray-200
    dark:border-gray-700

    shadow-lg
    hover:shadow-2xl

    transition-all duration-300
  "
>
  <h3
    className="
      text-lg sm:text-xl
      font-semibold

      text-orange-600
      dark:text-orange-400

      mb-6
    "
  >
    Recent Activity
  </h3>

  {activity.length === 0 ? (
    <p
      className="
        text-sm sm:text-base

        text-gray-500
        dark:text-gray-400
      "
    >
      No activity yet.
    </p>
  ) : (
    <ul className="space-y-3">
      {activity.map((item, index) => (
        <li
          key={index}
          className="
            px-4 py-3

            rounded-xl

            bg-gray-50
            dark:bg-gray-800

            border
            border-gray-100
            dark:border-gray-700

            text-sm sm:text-base

            text-gray-700
            dark:text-gray-300

            transition-all duration-200

            hover:bg-orange-50
            dark:hover:bg-gray-700
          "
        >
          {item}
        </li>
      ))}
    </ul>
  )}
</div>


);
};

export default RecentActivity;
