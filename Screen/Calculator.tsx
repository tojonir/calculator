import {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Button from '../Components/Button';

const Calculator = () => {
  const [result, setResult] = useState<string>('');
  const [calcul, setCalcul] = useState<string>('');
  const onButtonPress = (data: string) => {
    if (data === 'del') {
      setCalcul(calcul.slice(0, -1));
    } else if (data === 'c') {
      setCalcul('');
      setResult('');
    } else if (data === '=') {
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
        <Text style={style.result}>{result}</Text>
        <Text style={style.calcul}>{calcul}</Text>
      </View>
      <Image
        style={{width: '100%', height: 40}}
        source={require('../assets/icons/bottom.png')}
      />
      <View style={style.body}>
        <View style={style.row}>
          <Button
            onPress={() => onButtonPress('c')}
            isColored={true}
            label="C"
          />
          <Button
            onPress={() => onButtonPress('/100')}
            isColored={true}
            label="%"
          />
          <Button
            onPress={() => onButtonPress('del')}
            isColored={true}
            icon={
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/icons/delete.png')}
              />
            }
          />
          <Button
            onPress={() => onButtonPress('/')}
            isColored={true}
            label="/"
          />
        </View>

        <View style={style.row}>
          <Button onPress={() => onButtonPress('7')} label="7" />
          <Button onPress={() => onButtonPress('8')} label="8" />
          <Button onPress={() => onButtonPress('9')} label="9" />
          <Button
            onPress={() => onButtonPress('*')}
            isColored={true}
            label="*"
          />
        </View>

        <View style={style.row}>
          <Button onPress={() => onButtonPress('4')} label="4" />
          <Button onPress={() => onButtonPress('5')} label="5" />
          <Button onPress={() => onButtonPress('6')} label="6" />
          <Button
            onPress={() => onButtonPress('+')}
            isColored={true}
            label="+"
          />
        </View>

        <View style={style.row}>
          <Button onPress={() => onButtonPress('1')} label="1" />
          <Button onPress={() => onButtonPress('2')} label="2" />
          <Button onPress={() => onButtonPress('3')} label="3" />
          <Button
            onPress={() => onButtonPress('-')}
            isColored={true}
            label="-"
          />
        </View>

        <View style={style.row}>
          <Button
            onPress={() => onButtonPress('+-')}
            icon={
              <Image
                style={{width: 50, height: 50}}
                source={require('../assets/icons/+-.png')}
              />
            }
          />
          <Button onPress={() => onButtonPress('0')} label="0" />
          <Button onPress={() => onButtonPress('.')} label="." />
          <Button
            onPress={() => onButtonPress('=')}
            isColored={true}
            label="="
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.4,
    backgroundColor: '#5A11CC',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 20,
    paddingBottom: 20,
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
});

export default Calculator;
