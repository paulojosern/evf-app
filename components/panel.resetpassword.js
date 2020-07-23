import { useState } from 'react';
import { useAuth } from '~/store/Auth';

export default function SignUpForm() {
	const { resetPassword, sendEmail } = useAuth();
	const [password, setPassword] = useState('');
	console.log(password);

	function handleReset(e) {
		e.preventDefault();
		resetPassword(password);
	}
	function handleSend(e) {
		e.preventDefault();
		sendEmail();
	}

	return (
		<div className="panel">
			<div className="panel__signin">
				<div className="signin ">
					<div className="signin__form">
						<form>
							<div className="panel__item">
								<label className="panel__label">Password</label>
								<input
									type="password"
									name="password"
									className="panel__input"
									onChange={(event) => setPassword(event.target.value)}
								/>
							</div>
							<br />
							<button
								type="submit"
								className="btn"
								onClick={(e) => handleReset(e)}
							>
								Salvar
							</button>
							<button
								type="submit"
								className="btn"
								onClick={(e) => handleSend(e)}
							>
								enviar email
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
