import { useState } from 'react';

export default function Register() {

	// States for registration
	const [name, setName] = useState('');
    const [nim, setNim] = useState('');
    const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	// States for checking the errors
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState(false);

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
			setSubmitted(true);
			setError(false);
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
						<label className="pt-3 text-[#898989]">Name</label>
						<input onChange={handleName} className="border-b-2 border-b-gray-300 outline-none hover:border-b-black focus:border-b-black"
							value={name} type="text" />

						<label className="pt-3 text-[#898989]">NIM</label>
						<input onChange={handleNim} className="border-b-2 border-b-gray-300 outline-none hover:border-b-black focus:border-b-black"
							value={nim} type="text" />  

						<label className="pt-3 text-[#898989]">Username</label>
						<input onChange={handleUsername} className="border-b-2 border-b-gray-300 outline-none hover:border-b-black focus:border-b-black"
							value={username} type="text" />      

						<label className="pt-3 text-[#898989]">Email</label>
						<input onChange={handleEmail} className="border-b-2 border-b-gray-300 outline-none hover:border-b-black focus:border-b-black"
							value={email} type="email" />

						<label className="pt-3 text-[#898989]">Password</label>
						<input onChange={handlePassword} className="border-b-2 border-b-gray-300 outline-none hover:border-b-black focus:border-b-black"
							value={password} type="password" />

						<div className="flex justify-center pt-5">
							<button onClick={handleSubmit} className="text-white w-[50%] border-2 bg-[#2B5579] hover:bg-[#4ba3d3] rounded-full py-2 font-bold "
									type="submit">
								Daftar
							</button>
						</div>
                        <div className="py-5 text-sm">
                            <p>Sudah punya akun? <a href="/" class="no-underline hover:underline">Masuk disini</a></p>
                        </div>
					</div>	
				</form>
			</div>		
		</div>
	);
}
