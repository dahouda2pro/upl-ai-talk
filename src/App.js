
import "./App.css"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import useClipboard from "react-use-clipboard";
import {useState} from "react";
import logo from './images/logo_vectorise.png'
import { saveAs } from "file-saver";


const App = () => {
    const [textToCopy, setTextToCopy] = useState();
    const [isCopied, setCopied] = useClipboard(textToCopy, {
        successDuration:100000
    });

    //subscribe to thapa technical for more awesome videos

    const startListening = () => SpeechRecognition.startListening({ continuous: true, language: 'fr-FR' });
    const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        return null
    }

    const saveTextAsFile = () => {
        const blob = new Blob([transcript], {type: "text/plain;charset=utf-8"});
        saveAs(blob, "transcript.txt");
    }

    return (
        <>
            <div className="container">
            <img style={{display:'block', margin:'0 auto',paddingBottom:'25px', width:'150px',textAlign:'center'}} src={logo} width="150" height="150"/>
                <h2>UPL Talk</h2>
                <br/>
                <p>SVP, pouvez-vous me dire votre nom et votre numéro de téléphone ?</p>

                <div className="main-content" onClick={() =>  setTextToCopy(transcript)}>
                    {transcript}
                </div>

                <div style={{display:'inline', width:'150px',textAlign:'center'}}>

                    
                    <button className="first" onClick={startListening}>Commencer a ecouter</button>
                    <button className="second" onClick={SpeechRecognition.stopListening}>Arreter d'ecouter</button>
                    <button className="third" onClick={saveTextAsFile}>Sauvegarder le texte</button>
                </div>

            </div>

        </>
    );
};

export default App;