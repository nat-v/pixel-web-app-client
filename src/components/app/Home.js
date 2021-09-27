import React, { Component } from 'react';
import { Container, Jumbotron, Button } from 'reactstrap';

import bgimage from '../../images/bgImage.jpg'

function Home(props) {
    return (
        <div>
            <Jumbotron className='text-white' style={{ backgroundImage: `url(${bgimage})`, backgroundSize: 'cover' }}>
                <h1 className="display-3">Ласкаво просимо в Pixel Art World</h1>
                <p className="lead">Тут ви можете створювати нові піксель арт зображення та ділитись ними</p>
                <hr className="my-2" />
                <p>Щоб створити новий витвір мистецтва, натисніть на кнопку внизу</p>
                <p className="lead">
                    <Button color='warning' onClick={props.openEditor} href='/editor'>
                        <strong>Відкрити редактор</strong>
                    </Button>
                </p>
            </Jumbotron>
            <Jumbotron className='text-dark'>
                <p className="lead"><strong>Не забудьте зареєструватися, щоб отримати доступ до всіх можливостей веб-додатку</strong></p>
                <hr className="my-2" />
            </Jumbotron>

        </div>
    );
};

export default Home;