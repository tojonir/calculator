import {useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../Components/Button';
import FontAwsome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import {PRIMARY_COLOR} from '../Theme';

interface historyInterFace {
  date: string;
  operation: string;
}

const Calculator = () => {
  const [result, setResult] = useState<string>('');
  const [calcul, setCalcul] = useState<string>('');
  const [isFunction, setIsFuction] = useState<boolean>(false);
  const [history, sethistory] = useState<historyInterFace[]>([]);
  const {height} = Dimensions.get('window');
  const pan = useState<any>(new Animated.ValueXY({x: 0, y: -height}))[0];

  const showHistory = (state: boolean = true) => {
    Animated.spring(pan, {
      toValue: {x: 0, y: state ? 0 : -height},
      useNativeDriver: false,
    }).start();
  };

  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (_, gesture) => {
        if (gesture.moveY <= 600) pan.y.setValue(gesture.dy);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.moveY <= height / 1.5) {
          showHistory(false);
        }
        if (gesture.moveY >= height / 1.5) {
          showHistory();
        }
        pan.flattenOffset();
      },
    }),
  )[0];

  const onButtonPress = (data: string) => {
    if (data === 'del') {
      setCalcul(calcul.slice(0, -1));
    } else if (data === 'c') {
      setCalcul('');
      setResult('');
    } else if (data === '=') {
      sethistory([
        {
          date:
            new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
          operation: calcul,
        },
        ...history,
      ]);
      setResult(eval(calcul));
    } else if (data === '/' || data === '*' || data === '-' || data === '+') {
      if (
        calcul.slice(-1) === '/' ||
        calcul.slice(-1) === '*' ||
        calcul.slice(-1) === '-' ||
        calcul.slice(-1) === '+'
      ) {
        setCalcul(calcul.replace(/.$/, data));
      } else {
        setCalcul(calcul + data);
      }
    } else {
      if (result !== '') {
        setResult('');
        setCalcul(data);
      } else {
        setCalcul(calcul + data);
      }
    }
  };

  return (
    <View style={style.container}>
      <View style={style.header}>
        <FontAwsome5
          name="history"
          size={25}
          color="#fff"
          onPress={() => showHistory()}
        />
        <View>
          <Text style={style.result}>{result}</Text>
          <Text style={style.calcul}>{calcul}</Text>
        </View>
      </View>
      <Image
        style={{width: '100%', height: 40}}
        source={require('../assets/icons/bottom.png')}
      />
      {!isFunction && (
        <View style={style.body}>
          <View style={style.row}>
            <Button
              onPress={() => onButtonPress('c')}
              isColored={true}
              label="C"
            />
            <Button
              onPress={() => onButtonPress('*')}
              isColored={true}
              icon={
                <FontAwsome5 name="star-of-life" size={25} color="#6E00FF" />
              }
            />
            <Button
              onPress={() => onButtonPress('/')}
              isColored={true}
              icon={<FontAwsome5 name="divide" size={25} color="#6E00FF" />}
            />
            <Button
              onPress={() => onButtonPress('del')}
              isColored={true}
              icon={<FontAwsome5 name="backspace" size={25} color="#6E00FF" />}
            />
          </View>

          <View style={style.row}>
            <Button onPress={() => onButtonPress('7')} label="7" />
            <Button onPress={() => onButtonPress('8')} label="8" />
            <Button onPress={() => onButtonPress('9')} label="9" />
            <Button
              onPress={() => onButtonPress('+')}
              isColored={true}
              icon={<FontAwsome5 name="plus" size={25} color="#6E00FF" />}
            />
          </View>

          <View style={style.row}>
            <Button onPress={() => onButtonPress('4')} label="4" />
            <Button onPress={() => onButtonPress('5')} label="5" />
            <Button onPress={() => onButtonPress('6')} label="6" />
            <Button
              onPress={() => onButtonPress('+')}
              isColored={true}
              icon={<FontAwsome5 name="minus" size={25} color="#6E00FF" />}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingRight: 30,
            }}>
            <View style={{flexGrow: 1}}>
              <View style={{...style.row}}>
                <Button onPress={() => onButtonPress('1')} label="1" />
                <Button onPress={() => onButtonPress('2')} label="2" />
                <Button onPress={() => onButtonPress('3')} label="3" />
              </View>
              <View style={style.row}>
                <Button
                  onPress={() => setIsFuction(true)}
                  icon={
                    <FontAwsome5
                      name="square-root-alt"
                      size={25}
                      color="#000"
                    />
                  }
                />
                <Button onPress={() => onButtonPress('0')} label="0" />
                <Button onPress={() => onButtonPress('.')} label="." />
              </View>
            </View>
            <TouchableOpacity onPress={() => onButtonPress('=')}>
              <View style={style.equalButton}>
                <FontAwsome5 name="equals" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {isFunction && (
        <View style={style.body}>
          <View style={style.row}>
            <View style={style.col}>
              <Button
                label="INV"
                isColored
                onPress={() => onButtonPress('INV(')}
              />
              <Button label="sin" onPress={() => onButtonPress('INV(')} />
              <Button label="ln" onPress={() => onButtonPress('DEG(')} />
              <Button label="Pi" onPress={() => onButtonPress('%')} />
              <Button label="(" onPress={() => onButtonPress('%')} />
            </View>

            <View style={style.col}>
              <Button
                label="DEG"
                isColored
                onPress={() => onButtonPress('DEG(')}
              />
              <Button label="cos" onPress={() => onButtonPress('INV(')} />
              <Button label="log" onPress={() => onButtonPress('DEG(')} />
              <Button label="e" onPress={() => onButtonPress('%')} />
              <Button label=")" onPress={() => onButtonPress('%')} />
            </View>

            <View style={style.col}>
              <Button label="%" isColored onPress={() => onButtonPress('%')} />
              <Button label="tan" onPress={() => onButtonPress('INV(')} />
              <Button
                icon={
                  <FontAwsome5 name="square-root-alt" size={25} color="#000" />
                }
                onPress={() => onButtonPress('DEG(')}
              />
              <Button label="^" onPress={() => onButtonPress('%')} />
              <Button
                icon={<Octicons name="number" size={30} color="#000" />}
                onPress={() => setIsFuction(false)}
              />
            </View>
          </View>
        </View>
      )}

      <Animated.View
        style={{
          top: pan.y,
          ...style.history,
        }}>
        <View style={style.historyBody}>
          <FlatList
            style={{width: '100%'}}
            data={history}
            renderItem={({item}) => (
              <View style={{padding: 10}}>
                <Text style={{...style.textLight}}>{item.date}</Text>
                <Text
                  style={{
                    ...style.textLight,
                    textAlign: 'right',
                    fontSize: 20,
                  }}>
                  {item.operation}
                </Text>
                <Text
                  style={{
                    ...style.textLight,
                    textAlign: 'right',
                    fontSize: 40,
                  }}>
                  {eval(item.operation)}
                </Text>
              </View>
            )}
          />
          <View
            style={style.historyCloseBtn}
            {...panResponder.panHandlers}></View>
        </View>
        <View style={style.historyFooter}></View>
      </Animated.View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.4,
    backgroundColor: '#6E00FF',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 20,
  },
  textLight: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  result: {
    color: '#fff',
    fontSize: 50,
    fontFamily: 'Poppins-Medium',
  },
  calcul: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Poppins-Regular',
  },
  body: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  col: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  equalButton: {
    backgroundColor: '#6E00FF',
    width: 60,
    height: 130,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  history: {
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
  },
  historyBody: {
    backgroundColor: PRIMARY_COLOR,
    flexGrow: 1,
    alignItems: 'center',
  },
  historyFooter: {
    height: 100,
    backgroundColor: '#00000095',
  },
  historyCloseBtn: {
    position: 'absolute',
    bottom: 0,
    width: 100,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
});

export default Calculator;
