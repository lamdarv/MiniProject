import { useState } from 'react';
import axios from '../axiosConfig';

export default function Register() {

	// States for registration
	const [name, setName] = useState('');
    const [nim, setNim] = useState('');
    const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	// States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

	function togglePasswordVisibility() {
		setIsPasswordVisible((prevState) => !prevState);
	  }

	// Handling the name change
	const handleName = (e) => {
		setName(e.target.value);
		setSubmitted(false);
        setError(false);
	};

    const handleNim = (e) => {
		setNim(e.target.value);
		setSubmitted(false);
	};

    const handleUsername = (e) => {
		setUsername(e.target.value);
		setSubmitted(false);
	};

	// Handling the email change
	const handleEmail = (e) => {
		setEmail(e.target.value);
		setSubmitted(false);
	};

	// Handling the password change
	const handlePassword = (e) => {
		setPassword(e.target.value);
		setSubmitted(false);
	};

	// Handling the form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		if (name === '' || nim === '' || username === '' || email === '' || password === '') {
			setError(true);
		} else {
			// Create an object with the form data
            const formData = {
                name: name,
                nim: nim,
                username: username,
                email: email,
                password: password
            };

            // Send the data to the Back-End using Axios
            axios.post('/api/register', formData)
                .then(response => {
			setSubmitted(true);
			setError(false);
                })
                .catch(error => {
                    setError(true);
                });
		}
	};

	// Showing success message
	const successMessage = () => {
		return (
			<div
				className="success"
				style={{
					display: submitted ? '' : 'none',
				}}>
				<h1>User {name} successfully registered!!</h1>
			</div>
		);
	};

	// Showing error message if error is true
	const errorMessage = () => {
		return (
			<div
				className="error"
				style={{
					display: error ? '' : 'none',
				}}>
				<h1>Please enter all the fields</h1>
			</div>
		);
	};

	return (
		<div className="flex flex-col h-screen items-center justify-center bg-[#8ABCD7]">
			<div className="w-[30%] h-[90%] bg-white rounded-lg shadow-md px-8 pt-5">
                <div className=" justify-center flex ">
                    <img src={"./logo_maneasy.png"} className="h-[120px] w-[200px]"></img>
                </div>
				<div className='py-5 font-quicksand font-bold text-xl tracking-wide'>
					<h1>Daftar</h1>
				</div>

				{/* Calling to the methods */}
				<div className="messages">
					{errorMessage()}
					{successMessage()}
				</div>

				<form >
					<div className="flex flex-col font-montserrat">
						{/* Labels and inputs for form data */}
						<label className="pt-3 text-[#898989]">Nama</label>
						<input onChange={handleName} className="border-b-2 border-b-gray-300 outline-none hover:border-b-black focus:border-b-black"
							value={name} type="text" placeholder='John Doe'/>

						<label className="pt-3 text-[#898989]">NIM</label>
						<input onChange={handleNim} className="border-b-2 border-b-gray-300 outline-none hover:border-b-black focus:border-b-black"
							value={nim} type="text" placeholder='12345678'/>  

						<label className="pt-3 text-[#898989]">Username</label>
						<input onChange={handleUsername} className="border-b-2 border-b-gray-300 outline-none hover:border-b-black focus:border-b-black"
							value={username} type="text" placeholder='johndoe'/>      

						<label className="pt-3 text-[#898989]">Email</label>
						<input onChange={handleEmail} className="border-b-2 border-b-gray-300 outline-none hover:border-b-black focus:border-b-black"
							value={email} type="email" placeholder='johndoe@polban.ac.id'/>

						<label className="pt-3 text-[#898989]">Password</label>
						<div className="relative">
							<input onChange={handlePassword} className="w-full border-b-2 border-b-gray-300 outline-none hover:border-b-black focus:border-b-black"
								value={password} type={isPasswordVisible ? "text" : "password"} placeholder='Johndoe123'/>
							<button
								className="absolute inset-y-0 right-0 flex items-center text-gray-300 pb-2"
								onClick={togglePasswordVisibility}
								type='button'
							>
								{isPasswordVisible ? (
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
								<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								) : (
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
								</svg>
								)}
							</button>  
						</div>

						<div className="flex justify-center pt-5">
							<button onClick={handleSubmit} className="text-white w-[50%] border-2 bg-[#2B5579] hover:bg-[#4ba3d3] rounded-full py-2 font-bold "
									type="submit">
								Daftar
							</button>
						</div>
                        <div className="py-5 text-sm">
                            <p>Sudah punya akun? <a href="/" class="underline hover:font-medium text-xs">Masuk disini</a></p>
                        </div>
					</div>	
				</form>
			</div>		
		</div>
	);
}
