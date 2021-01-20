import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Col,
    Row,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText
} from "reactstrap";
import { ResponsiveRadar } from '@nivo/radar'



export default class VoteModal extends Component {
  constructor(props){
    super(props)
    this.state = {
      "":""
    }
  }

  makeChartData(vote) {
    console.log(vote)
    let data = [
        {
          'resp': 'Yes',
          'Republican': vote.republican.yes,
          'Democrat': vote.democratic.yes,
          'Independent': vote.independent.yes
        },
        {
          'resp': 'No',
          'Republican': vote.republican.no,
          'Democrat': vote.democratic.no,
          'Independent': vote.independent.no
        },
        {
          'resp': 'No Vote',
          'Republican': vote.republican.not_voting,
          'Democrat': vote.democratic.not_voting,
          'Independent': vote.independent.not_voting
        },
        {
          'resp': 'Present',
          'Republican': vote.republican.present,
          'Democrat': vote.democratic.present,
          'Independent': vote.independent.present
        }
      ]
    return data
  }
  
  render() {
    const {vote, toggle} = this.props
    let customPalette = ['#5663ff', '#ff4242', '#fa8775', '#ea5f94', '#cd34b5', '#9d02d7', '#0000ff']
    return (
      <Modal className="vote-modal" isOpen={true} toggle={toggle}>
        <ModalHeader  toggle={toggle} >
          VOTE
        </ModalHeader>
        <ModalBody>
        <ResponsiveRadar
        data={this.makeChartData(vote)}
        keys={[ 'Republican', 'Democrat', 'Independent' ]}
        indexBy="resp"
        maxValue="auto"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={36}
        enableDots={true}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel={true}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={{ scheme: 'set1' }}
        fillOpacity={0.25}
        blendMode="multiply"
        animate={true}
        motionConfig="wobbly"
        isInteractive={true}
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                symbolSize: 12,
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
        </ModalBody>
        <ModalFooter>

        </ModalFooter>
      </Modal>
    )
  }
}