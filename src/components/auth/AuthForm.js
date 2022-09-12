import { useRef } from "react";


const AuthForm = ({onLogin, onChange, form}) =>{


    return(
        <div>
            <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
                <div className="w-full p-6 m-auto bg-white border-t border-purple-600 rounded shadow-lg shadow-purple-800/50 lg:max-w-md">
                    <h1 className="text-3xl font-semibold text-center text-purple-700">공부인증</h1>
                    <form className="mt-6" onSubmit={onLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm text-gray-800">Email</label>
                            <input  className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={onChange} name="username" value={form.username}/>
                            
                        </div>
                        <div className="mt-4">
                            <div>
                                <label htmlFor="password" className="block text-sm text-gray-800">Password</label>
                                <input type="password" className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={onChange} name="password" value={form.password}/>
                            </div>
                            <div className="mt-6">
                                <button 
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
                                >
                                    Login
                                </button>
                            </div>
                        </ div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AuthForm;