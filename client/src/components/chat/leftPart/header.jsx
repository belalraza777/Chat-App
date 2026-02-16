import './leftPart.css';
import logo from '../../../assets/logo.png';
export default function Header() {
    return (
        <div className="left__header">
            <img src={logo} alt="Loading" className="logo" />
        </div>
    );
}
