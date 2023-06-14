import React, {useState} from 'react';
import {  signInWithCustomToken  } from 'firebase/auth';
import { auth } from './FirebaseConfiguration';
import api from './services/api';
import { login } from './services/auth'
// import { NavLink, useNavigate } from 'react-router-dom'
 
const Login = () => {
    // const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [user, setUser] = useState(null);
    const [products, setProducts] = useState([]);
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
       
    const onLogin = async (e) => {
        e.preventDefault();
        const userResponse = await api.post('/login', {email, password})
        const { token } = userResponse.data;
        const { idToken } = userResponse.data;
        signInWithCustomToken(auth, token)
        .then((userCredential) => {
            // Signed in
            login(idToken);
            setUser(userCredential.user);
            // navigate("/home")

            setSuccess(true);
            fetchDatas();
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
        });
       
    }

    const fetchDatas = async () => {
        const response = await api.get('/products');
        setProducts(response.data);
    }
 
    return(
        <>
            <main >        
                <section>
                    <div>                                            
                        <p> SpotFlautas</p>                       
                                                       
                        <form>                                              
                            <div>
                                <label htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"                                    
                                    required                                                                                
                                    placeholder="Email address"
                                    onChange={(e)=>setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"                                    
                                    required                                                                                
                                    placeholder="Password"
                                    onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                                                
                            <div>
                                <button                                    
                                    onClick={onLogin}                                        
                                >      
                                    Login                                                                  
                                </button>
                            </div>                               
                        </form>
                       {success && <p>Produtos da Loja</p>}
                        <ul>
                            {products.map(product => (
                                <li key={product.id}>
                                    <p>{product.nome} - {product.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                                </li>
                            ))}
                        </ul>

                                                   
                    </div>
                </section>
            </main>
        </>
    )
}
 
export default Login