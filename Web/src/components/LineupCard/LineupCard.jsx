import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../routes';

import { Card, Image, Segment } from 'semantic-ui-react';

function LineupCard(props) {
    try {
        const { title, image, description, id } = props.player;
        return (<Card>
            <Card.Content>
                <Image
                    floated='right'
                    size='mini'
                    src={image}
                />
                <Card.Header><Link to={routes.player + "/" + id}>{title}</Link></Card.Header>
                <Card.Meta>{description}</Card.Meta>
            </Card.Content>
        </Card>
        );
    } catch (Exception) {
        return (<Segment></Segment>);
    }

}

export default LineupCard;