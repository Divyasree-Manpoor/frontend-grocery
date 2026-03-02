import AppRoute from "./routes/AppRoute"; 
import { Toaster } from "react-hot-toast";
 function App() 
 { return ( 
 <div className=" min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 transition-colors duration-500 ">
   <AppRoute />
    <Toaster position="top-right" toastOptions={{ duration: 3000, style: { background: "#1f2937", color: "#fff", borderRadius: "12px", padding: "12px 16px", fontSize: "14px", }, }} />
     </div>
      ); 
    } 
    
    
    export default App;