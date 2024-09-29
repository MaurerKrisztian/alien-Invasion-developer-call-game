import React, { useState, useEffect } from 'react';
import {IGamePropsBase} from "./interfaces/gameprops.interface.ts";

interface RegexpGameProps extends IGamePropsBase {
    onWin: () => void;    // hook to trigger when player wins
}

const RegexGame: React.FC<RegexpGameProps> = ({ onWin }) => {
    const [currentChallenge, setCurrentChallenge] = useState(1); // Track the current challenge
    const [regexInput, setRegexInput] = useState(''); // Store user input
    const [feedback, setFeedback] = useState(''); // Feedback to show correct/incorrect
    const [completed, setCompleted] = useState(false); // When all challenges are completed
    const [showHint, setShowHint] = useState(false); // Show/Hide hint
    const [showSolution, setShowSolution] = useState(false); // Show/Hide solution
    const [highlightedText, setHighlightedText] = useState(''); // Highlighted data

    // Data for the challenges
    const challenges = [
        {
            id: 1,
            description: `**1. Locate the alien codes**:
      Extract all occurrences of \`ALIEN:CODE-####\` from the following data block.`,
            data: `3#$$ER-56-ALIEN:CODE-1256-TELE_COM@4++*Z!92  
      X52:$$SAT-42-ALIEN:CODE-8432-MIL_COMM@9#P!70  
      J63:&&COM-31-ALIEN:CODE-9627-CIV_RADAR@2^&*90`,
            expectedMatches: ["ALIEN:CODE-1256", "ALIEN:CODE-8432", "ALIEN:CODE-9627"],
            hint: 'Hint: The pattern starts with `ALIEN:CODE-` followed by 4 digits.',
            solution: 'ALIEN:CODE-\\d{4}'
        },
        {
            id: 2,
            description: `**2. Unlock the satellite frequencies**:
      Extract all the satellite frequency values (numbers with decimals followed by "HZ") from the following data block.`,
            data: `<freq:993.23HZ> [alien::/##] <freq:784.56HZ> [[//code--]] <freq:350.45HZ> [=alien+>@!*@] <freq:651.67HZ> [###encrypted]`,
            expectedMatches: ["993.23HZ", "784.56HZ", "350.45HZ", "651.67HZ"],
            hint: 'Hint: Look for a number with decimals followed by "HZ".',
            solution: '\\d+\\.\\d+HZ'
        },
        {
            id: 3,
            description: `**3. Break the final lock**:
      Extract all keys that match the format \`ENCRYPT_XXXX\` (where "XXXX" can be any four alphanumeric characters) from the following data block.`,
            data: `AD893!@*124_ENCRYPT_XP92*0934_END>>  
      K#T429@@002_ENCRYPT_PLN28**2928_END<<  
      C9248**X32_ENCRYPT_OW99_9234!0912!END>>`,
            expectedMatches: ["ENCRYPT_XP92", "ENCRYPT_PLN2", "ENCRYPT_OW99"],
            hint: 'Hint: The key starts with "ENCRYPT_" and is followed by 4 alphanumeric characters.',
            solution: 'ENCRYPT_\\w{4}'
        }
    ];

    useEffect(() => {
        const challenge = challenges[currentChallenge - 1];
        const regex = new RegExp(regexInput, 'g');
        const highlighted = challenge.data.replace(regex, (match) => `<span style="color:yellow">${match}</span>`);
        setHighlightedText(highlighted);
    }, [regexInput, currentChallenge]);

    // Handle input change
    const handleRegexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegexInput(e.target.value);
    };

    // Handle form submission for regex validation
    const handleSubmit = () => {
        const challenge = challenges[currentChallenge - 1];
        const regex = new RegExp(regexInput, 'g');
        const matches = challenge.data.match(regex);

        if (matches && matches.length === challenge.expectedMatches.length && matches.every((match, i) => match === challenge.expectedMatches[i])) {
            setFeedback('Correct!');
            if (currentChallenge === challenges.length) {
                setCompleted(true); // All challenges completed
            } else {
                setCurrentChallenge(currentChallenge + 1); // Move to next challenge
            }
        } else {
            setFeedback('Incorrect. Try again.');
        }
    };

    // Handle form submission
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    if (completed) {
        onWin()
    }

    return (
        <div style={containerStyle}>
            <h1>Regex Challenge</h1>
            <p style={descriptionStyle}>{challenges[currentChallenge - 1].description}</p>
            <div style={highlightedContainerStyle} dangerouslySetInnerHTML={{ __html: highlightedText }}></div>

            <input
                type="text"
                placeholder="Enter your regex pattern here"
                value={regexInput}
                onChange={handleRegexChange}
                onKeyPress={handleKeyPress}
                style={inputStyle}
            />
            <button style={submitBtnStyle} onClick={handleSubmit}>
                Submit Regex
            </button>

            <div style={feedbackStyle}>{feedback}</div>

            <div>
                <button style={hintBtnStyle} onClick={() => setShowHint(!showHint)}>
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                </button>
                {showHint && <p style={hintStyle}>{challenges[currentChallenge - 1].hint}</p>}
            </div>

            <div>
                <button style={solutionBtnStyle} onClick={() => setShowSolution(!showSolution)}>
                    {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
                {showSolution && <p style={solutionStyle}>{challenges[currentChallenge - 1].solution}</p>}
            </div>
        </div>
    );
};

// Styles
const containerStyle = {
    textAlign: 'center',
    color: '#00ff00',
    backgroundColor: '#0e0e0e',
    padding: '50px',
    border: '2px solid #00ff00',
    boxShadow: '0 0 20px #00ff00',
    marginTop: '50px',
} as React.CSSProperties;

const descriptionStyle = {
    fontSize: '1.2em',
    marginBottom: '20px',
    lineHeight: '1.5',
} as React.CSSProperties;

const highlightedContainerStyle = {
    fontSize: '1em',
    marginBottom: '20px',
    backgroundColor: '#333',
    padding: '10px',
    borderRadius: '5px',
    color: '#fff',
    whiteSpace: 'pre-wrap',
    border: '1px solid #00ff00',
} as React.CSSProperties;

const inputStyle = {
    padding: '10px',
    fontSize: '1em',
    width: '80%',
    marginBottom: '10px',
    borderRadius: '5px',
    border: '2px solid #00ff00',
    backgroundColor: '#0e0e0e',
    color: '#00ff00',
} as React.CSSProperties;

const submitBtnStyle = {
    padding: '10px 20px',
    fontSize: '1.2em',
    backgroundColor: '#00ff00',
    color: '#0e0e0e',
    border: 'none',
    cursor: 'pointer',
    marginBottom: '20px',
} as React.CSSProperties;

const feedbackStyle = {
    fontSize: '1.2em',
    marginTop: '20px',
    color: '#ff4141',
} as React.CSSProperties;

const hintBtnStyle = {
    marginTop: '10px',
    padding: '10px',
    fontSize: '1em',
    backgroundColor: '#32cd32',
    border: 'none',
    cursor: 'pointer',
} as React.CSSProperties;

const hintStyle = {
    color: '#00ff00',
    fontSize: '1em',
    marginTop: '10px',
} as React.CSSProperties;

const solutionBtnStyle = {
    marginTop: '10px',
    padding: '10px',
    fontSize: '1em',
    backgroundColor: '#ff4141',
    border: 'none',
    cursor: 'pointer',
} as React.CSSProperties;

const solutionStyle = {
    color: '#ff4141',
    fontSize: '1em',
    marginTop: '10px',
} as React.CSSProperties;

const completionStyle = {
    color: '#00ff00',
    textAlign: 'center',
    marginTop: '50px',
    fontSize: '1.5em',
} as React.CSSProperties;

export default RegexGame;

