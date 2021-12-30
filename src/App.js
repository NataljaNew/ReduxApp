import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import Content from "./components/content/Content";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import store from "./store/storeItem";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Header/>
                <div style={{background: `lightgray`}} >
                    <Content/>
                </div>
                <Footer/>
            </BrowserRouter>
        </Provider>
    );
}
export default App;