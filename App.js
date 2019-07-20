import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState:
        [
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0]
        ],
      currentPlayer: 1
    })
  }

  getWinner = () => {
    const NUM_TILES = 3;
    var arr = this.state.gameState;
    var sum;
    // Check rows
    for(var i = 0; i < NUM_TILES; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if(sum == 3) { return 1; }
      else if(sum == -3) { return -1; }
    }

    for(var i = 0; i < NUM_TILES; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if(sum == 3) { return 1; }
      else if(sum == -3) { return -1; }
    }

    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if(sum == 3) { return 1; }
    else if(sum == -3) { return -1; }

    sum = arr[2][0] + arr[1][1] + arr[2][0];
    if(sum == 3) { return 1; }
    else if(sum == -3) { return -1; }

    // There are no winners
    return 0;

  }

  onTilePress = (row, col) => {

    var value = this.state.gameState[row][col];
    if(value !== 0) { return; }

    var currentPlayer = this.state.currentPlayer;

    var arr = this.state.gameState.slice();

    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr, currentPlayer: -currentPlayer })

    var winner = this.getWinner();
    if(winner == 1) {
      alert('Player 1 is the winner!');
      this.initializeGame();
    }
    else if(winner == -1) {
      alert('Player 2 is the winner!');
      this.initializeGame();
    }
  }

  onNewGamePress = () => {
    this.initializeGame();
  }

  renderIcon = (row, col) => {
    var val = this.state.gameState[row][col];
    switch (val) {
      case 1: return <Icon name='close' style={styles.tileX} />;
      case -1: return <Icon name='circle-outline' style={styles.tileO} />;
      default: return <View />;

    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={ styles.playerText}>Your Turn Player {this.state.currentPlayer == 1 ? 'X' : 'O'}</Text>
        </View>
        <View style={{ flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(0,0)} style={[[styles.tile, { borderLeftWidth: 0, borderTopWidth:0}], { borderLeftWidth: 0, BorderTopWidth:0}]}>
            {this.renderIcon(0,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,1)} style={[styles.tile, { borderTopWidth:0}]}>
            {this.renderIcon(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0,2)} style={[styles.tile, { borderRightWidth: 0, borderTopWidth:0}]}>
            {this.renderIcon(0,2)}

          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(1,0)} style={[styles.tile, { borderLeftWidth: 0}]}>
            {this.renderIcon(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,1)} style={styles.tile}>
            {this.renderIcon(1,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1,2)} style={[styles.tile, { borderRightWidth: 0 }]}>
            {this.renderIcon(1,2)}
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.onTilePress(2,0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth:0 }]}>
            {this.renderIcon(2,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
            {this.renderIcon(2,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2,2)} style={[styles.tile, { borderRightWidth: 0, borderBottomWidth:0 }]}>
            {this.renderIcon(2,2)}
          </TouchableOpacity>
        </View>
        <View style={ styles.bottomButtonArea}>
          <TouchableWithoutFeedback onPress={this.onNewGamePress}>
            <Text style={styles.newGameButtonText}>New Game</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 10,
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tileX: {
    color: 'red',
    fontSize: 60,
  },
  tileO: {
    color: 'green',
    fontSize: 60,
  },
  playerText: {
    fontSize: 40,
    paddingBottom: 30,
  },
  bottomButtonArea: {
    paddingTop: 50,
  },
  newGameButtonText: {
    fontSize: 40,
    color: 'red',
  }
});
