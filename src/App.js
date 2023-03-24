import './App.scss'
import Card from "./components/Card";
import Header from "./components/header";
import Drawer from "./components/Drawer";
import UnderHeader from "./components/UnderHeader";

const App = () => {
    return (
        <div className="wrapper clear">
            <Drawer/>
            <Header/>
            <div className="content p-40">
                <UnderHeader/>
                <div className="d-flex">
                    <Card/>
                </div>
            </div>
        </div>
    );
}

export default App;
