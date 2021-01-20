import React, { Component } from 'react';
import { backgrounds } from '../Views/Vote'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
} from "reactstrap";
import { ResponsivePie } from '@nivo/pie'



export default class VoteModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      "":""
    }
  }

  makeChartData(vote) {
    let data = [
        {
          "id": 'Dem. Yes',
          "label": 'Dem. Yes: ' + vote.democratic.yes,
          "color": 'hsl(211deg 100% 50%)',
          "value": vote.democratic.yes
        },
        {
          "id": 'Dem. No',
          "label": 'Dem. No: ' + vote.democratic.no,
          "color": 'hsl(211deg 100% 50%)',
          "value": vote.democratic.no
        },
        {
          "id": 'Dem. No Vote or Present',
          "label": 'N/A|Present: ' + (vote.democratic.not_voting + vote.democratic.present),
          "color": 'hsl(211deg 100% 50%)',
          "value": vote.democratic.not_voting + vote.democratic.present
        },
        {
          "id": 'Rep. Yes',
          "label": 'Rep. Yes: ' + vote.republican.yes,
          "color": 'hsl(354deg 70% 54%)',
          "value": vote.republican.yes
        },
        {
          "id": 'Rep. No',
          "label": 'Rep. No: ' + vote.republican.no,
          "color": 'hsl(354deg 70% 54%)',
          "value": vote.republican.no
        },
        {
          "id": 'Rep. No Vote or Present',
          "label": 'N/A|Present ' + (vote.republican.not_voting + vote.republican.present),
          "color": 'hsl(354deg 70% 54%)',
          "value": vote.republican.not_voting + vote.republican.present
        },
        {
          "id": 'Ind. Yes',
          "label": 'Ind. Yes: ' + vote.independent.yes,
          "color": 'hsl(208deg 7% 46%)',
          "value": vote.independent.yes
        },
        {
          "id": 'Ind. No',
          "label": 'Ind. No: ' + vote.independent.no,
          "color": 'hsl(208deg 7% 46%)',
          "value": vote.independent.no
        },
        {
          "id": 'Ind. No Vote or Present',
          "label": 'N/A|Present: ' + (vote.independent.not_voting + vote.independent.present),
          "color": 'hsl(208deg 7% 46%)',
          "value": vote.independent.not_voting + vote.independent.present
        }
      ]
    return data
  }
  
  render() {
    const {vote, toggle} = this.props
    return (
      <Modal className="vote-modal" isOpen={true} toggle={toggle}>
        <ModalHeader className={"" + backgrounds[vote.result]}  toggle={toggle} >
          VOTE: {vote.congress + " | " + vote.session + " - " + vote.roll_call + "  -  " + vote.question}
        </ModalHeader>
        <ModalBody>
        <div className="holds-graph">
        <ResponsivePie
        data={this.makeChartData(vote)}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        startAngle={-80}
        endAngle={80}
        innerRadius={0.4}
        padAngle={0.7}
        cornerRadius={3}
        colors={{ datum: 'data.color' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        defs={[
            {
                id: 'demDots',
                type: 'patternDots',
                background: 'hsl(211deg 100% 50%)',
                color: 'rgba(255, 255, 255, 0.7)',
                size: 5,
                padding: 1,
                stagger: true
            },
            {
              id: 'repDots',
              type: 'patternDots',
              background: 'hsl(354deg 70% 54%)',
              color: 'rgba(255, 255, 255, 0.7)',
              size: 5,
              padding: 1,
              stagger: true
            },
            {
              id: 'indDots',
              type: 'patternDots',
              background: 'hsl(208deg 7% 46%)',
              color: 'rgba(255, 255, 255, 0.7)',
              size: 5,
              padding: 1,
              stagger: true
            },
            {
              id: 'demLines',
              type: 'patternLines',
              background: 'hsl(211deg 100% 50%)',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            },
            {
              id: 'repLines',
              type: 'patternLines',
              background: 'hsl(354deg 70% 54%)',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            },
            {
              id: 'indLines',
              type: 'patternLines',
              background: 'hsl(208deg 7% 46%)',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'Dem. No Vote or Present'
                },
                id: 'demDots'
            },
            {
                match: {
                    id: 'Rep. No Vote or Present'
                },
                id: 'repDots'
            },
            {
                match: {
                    id: 'Ind. No Vote or Present'
                },
                id: 'indDots'
            },
            {
                match: {
                    id: 'Dem. No'
                },
                id: 'demLines'
            },
            {
                match: {
                    id: 'Rep. No'
                },
                id: 'repLines'
            },
            {
                match: {
                    id: 'Ind. No'
                },
                id: 'indLines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 0,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 120,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
        />
        </div>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <ListGroupItemHeading>
              Details
            </ListGroupItemHeading>
            <ListGroupItemText>
              {"Date: " + vote.date + " - " + vote.time}
            </ListGroupItemText>
            <ListGroupItemText>
              {"Result: " + vote.result}
            </ListGroupItemText>
          </ListGroupItem>
          <ListGroupItem>
            <ListGroupItemHeading>
              Text
            </ListGroupItemHeading>
            <ListGroupItemText>
              {vote.description}
            </ListGroupItemText>
          </ListGroupItem>
        </ListGroup>
        </ModalBody>
        <ModalFooter>
        <Button color="primary" href={vote.url}>
          Go to vote page
        </Button>
        <Button onClick={toggle}>
          Cancel
        </Button>
        </ModalFooter>
      </Modal>
    )
  }
}