import {FC, ReactElement} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface ButtonProps {
  label?: string;
  icon?: ReactElement;
  isColored?: boolean;
  onPress: () => void;
}

const Button: FC<ButtonProps> = ({label, icon, isColored = false, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={style.button}>
        {label && (
          <Text style={{color: isColored ? '#5A11CC' : '#000', ...style.text}}>
            {label}
          </Text>
        )}
        {icon && icon}
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    width: 50,
    height: 70,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Poppins-Medium',
    fontSize: 30,
  },
});

export default Button;
