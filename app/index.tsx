import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao Quiz App!</Text>
      <Text style={styles.subtitle}>Escolha a dificuldade:</Text>
      <Button
        title="Fácil"
        onPress={() => router.push('/screens/QuizScreen?difficulty=easy')}
      />
      <Button
        title="Médio"
        onPress={() => router.push('/screens/QuizScreen?difficulty=medium')}
      />
      <Button
        title="Difícil"
        onPress={() => router.push('/screens/QuizScreen?difficulty=hard')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  subtitle: { fontSize: 18, marginBottom: 20 },
});

export default HomeScreen;
