import React from 'react';
import {Radio, Space, Tooltip, Typography} from 'antd';
import "./Help.css"
import {emotionDefinitions, exampleEmotions} from "../../constants/Emotions";
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';


const { Text, Title } = Typography;


function MyButton({ mode }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/Test', {state: {mode} });
  }

  return (
    <Button onClick={handleClick}>
      Gå till exempelvideor
    </Button>  );
}


const Help = () => (
    <div>
    <div className="center">
        <Space direction="vertical">
            <br />

            <Title>Instruktioner</Title>
            <Text>
                Detta test har för avsikt att mäta din förmåga att känna igen känslouttryck i människors
                ansikten och röster.
            </Text>
            <Text>
                Din uppgift är att titta / lyssna på en serie med korta audio-video inspelningar av personer
                som uttrycker olika känslor. Efter varje uppspelning av dessa inspelningar du tittat på,
                ombeds du att välja namnet på den känsla som personen uttrycker.
                Känslorna presenteras som knappar där man kan välja svar genom att klicka.
                Om man håller muspekaren över knappen så visas en kort beskrivning av känslo-ordet, se exempel:
            </Text>

            <div className="exampleButtons">
            <Radio.Group name="reply"
                         size="large"
                         buttonStyle="solid"
            >
                {exampleEmotions.map((emotion) => (
                    <Tooltip title={emotionDefinitions[emotion]} color={"blue"} key={emotion} placement="top">
                        <Radio.Button value={emotion}>{emotion}</Radio.Button>
                    </Tooltip>
                ))}
            </Radio.Group>
            </div>
            <Text>
                Efter varje inspelning som presenteras måste <b>du</b> välja ett (men inte fler) känslo-ord för att gå
                vidare. Det kan vara så att du är osäker, oroa dig inte för det, det händer alla. Det bästa sättet
                att göra det är att ge <b>ditt</b> spontana svar utan att fundera för mycket.
                Du kan spela upp samma video så många gånger som du vill och när du har valt den känsla som
                du tror visas av skådespelaren så trycker du på skicka för att komma till nästa video!
            </Text>

           <Text>
                Testet är uppbyggt enligt följande: Först kommer 3 exempel. Efter varje videoklipp ska du välja en
                känsla. Efter du har sett exempelfilmerna kommer det riktiga testet att börja.

            </Text>
        </Space>
        </div>

        <div className="goToTest">
      <MyButton mode="test"></MyButton>
    </div>
        </div>


)

export default Help;