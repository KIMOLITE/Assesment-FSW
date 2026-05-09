import {useState} from "react";
import {useAuthStore} from "../store/useAuthStore";

function LoginPage(){
    const [email, setEmail] = useState("");

    const[password, setPassword] = useState("");
    const login = useAuthStore((state) => state.login);


    async function handleLogin(event: React.FormEvent){
        event.preventDefault();

        try{
            await login(email, password);
            
        }catch(error){
            console.log(error);
            alert("Login Failed");
        }

        return(
            <div className="min-h-screen flex items-center justify-center bg gray-100">
                <form onSubmit={handleLogin}>
                    className="bg-white p-8 rounded-xl shadow-md w-[400px]"
                </form>

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h1>

                <input type="email" placeholder="Email" value={email} onChange={function (event){
                    setEmail(event.target.value);
                }} className="w-full border p-3 rounded mb-4"/>

                <input type="password" placeholder="Password" value={password} onChange={function(event) setPassword(event.target.value)}/>
            </div>
        )
    }
}