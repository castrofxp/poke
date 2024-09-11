import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#F5F5F5'
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        gap: 20,
    },
    containerT: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: 100
    },
    containerP: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    containerM: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginBottom: 200
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    pickerI: {
        width: 200,
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#4CAF50',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        borderColor: '#388E3C',
        borderWidth: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    pickerPress: {
        backgroundColor: '#388E3C',
    },
    txt5: {
        color: 'black',
        fontSize: 20
    }
});

const Pokemon = () => {
    const [pokemon, setPokemon] = useState('');
    const [pokemonTypes, setPokemonTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [filteredPokemons, setFilteredPokemons] = useState([]);

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/type')
            .then(response => response.json())
            .then(data => setPokemonTypes(data.results))
            .catch(error => console.log('Error fetching Pokémon types:', error));

        fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
            .then(response => response.json())
            .then(data => setFilteredPokemons(data.results))
            .catch(error => console.log('Error fetching Pokémon list:', error));
    }, []);

    useEffect(() => {
        if (selectedType) {
            fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
                .then(response => response.json())
                .then(data => {
                    const pokemonOfType = data.pokemon.map(p => p.pokemon);
                    setFilteredPokemons(pokemonOfType);
                })
                .catch(error => console.log('Error fetching Pokémon by type:', error));
        } else {
            fetch('https://pokeapi.co/api/v2/pokemon?limit=1000')
                .then(response => response.json())
                .then(data => setFilteredPokemons(data.results))
                .catch(error => console.log('Error fetching Pokémon list:', error));
        }
    }, [selectedType]);

    return (
        <View style={styles.container1}>
            <View style={styles.containerT}>
                <Text style={styles.titulo}>Selecione Seu Pokémon</Text>
            </View>

            <View style={styles.container}>
                <View style={styles.containerP}>
                    <Text>Selecione o Tipo</Text>
                    <Picker
                        style={styles.pickerI}
                        selectedValue={selectedType}
                        onValueChange={(itemValue) => setSelectedType(itemValue)}
                    >
                        <Picker.Item label="Todos os Tipos" value="" />
                        {pokemonTypes.map(type => (
                            <Picker.Item key={type.name} label={type.name} value={type.name} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.containerP}>
                    <Text>Selecione o Pokémon</Text>
                    <Picker
                        style={styles.pickerI}
                        selectedValue={pokemon}
                        onValueChange={(itemValue) => setPokemon(itemValue)}
                    >
                        <Picker.Item label="Selecione o Pokémon" value="" />
                        {filteredPokemons.map((item, index) => (
                            <Picker.Item key={index} label={item.name} value={item.name} />
                        ))}
                    </Picker>
                </View>
            </View>
            <View style={styles.containerM}>
                {pokemon ? <Text style={styles.txt5}>Você selecionou {pokemon}</Text> : null}
            </View>
        </View>
    );
};

export default Pokemon;

