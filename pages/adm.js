import { useSession } from '~/store/Session';
import Panel from '~/components/panel';
import { PanelProvider } from '~/context/panel.context';
import Signin from '~/components/Signin';
import Signup from '~/components/Signup';

export default function Adm() {
	const { isLoggedIn, isLoading, msg } = useSession();

	if (isLoading) {
		return (
			<div className="loader">
				<div className="circle"></div>
			</div>
		);
	}

	return isLoggedIn ? (
		<PanelProvider>
			<Panel />
		</PanelProvider>
	) : (
		<>
			<Signin msg={msg} />
			<Signup />
		</>
	);
}
