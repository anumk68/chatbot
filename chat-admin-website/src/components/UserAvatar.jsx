


// const UserAvatar = ({ email }) => {
//     const userInitial= email ? email.chartAr(0).toUpperCase():'?';
//     return (
//         <div 
//       className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center 
//                  text-white text-lg font-bold shadow-lg ring-2 ring-purple-300 transition-transform 
//                  duration-200 hover:scale-110 cursor-pointer"
//       title={`Logged in as: ${email || 'Unknown'}`} // Optional: Tooltip for full username
//     >
//       {userInitial} 
//     </div>
//     );
// };




// export default UserAvatar;


const UserAvatar = ({ email }) => {
    // 🚨 FIX: Corrected typo from 'chartAr' to 'charAt'
    const userInitial= email ? email.charAt(0).toUpperCase():'?';
    return (
        <div 
      className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center 
                 text-white text-lg font-bold shadow-lg ring-2 ring-purple-300 transition-transform 
                 duration-200 hover:scale-110 cursor-pointer"
      title={`Logged in as: ${email || 'Unknown'}`} 
    >
      {userInitial} 
    </div>
    );
};

export default UserAvatar;

