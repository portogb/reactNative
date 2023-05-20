import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, LayoutAnimation, UIManager, Platform, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Notas() {
    const navigation = useNavigation();

    const [expandedItems, setExpandedItems] = useState([]);

    // Função para alternar o estado expandido de um item
    const toggleItem = (itemId) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        if (expandedItems.includes(itemId)) {
            // Remove o item do array de itens expandidos
            setExpandedItems(expandedItems.filter((id) => id !== itemId));
        } else {
            // Adiciona o item ao array de itens expandidos
            setExpandedItems([...expandedItems, itemId]);
        }
    };

    const [data, setData] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const resp = await fetch("http://academico3.rj.senac.br/api/Acompanhamento/filterByBrupoIdByEstudanteId/1/1");
            const data = await resp.json();
            setData(data);
        };

        fetchData();
    }, []);

    const renderItem = ({ item }) => {
        const isExpanded = expandedItems.includes(item.id);

        return (
            <TouchableOpacity onPress={() => toggleItem(item.id)} style={styles.container}>
                <View style={styles.accordionHeader}>
                    <View style={styles.order}>
                        <Text style={styles.title}>{item.situacaoAprendizagem.titulo}</Text>
                        <Text style={styles.title}>{item.avaliacaoConceito.descricao}</Text>
                    </View>
                    {isExpanded && <Text style={styles.contentText}>{item.comentarios[0].comentario}</Text>}
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
        />
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      marginTop: 10,
    },
    accordionItem: {
      borderRadius: 5,
      marginBottom: 10,
      overflow: 'hidden',
    },
    accordionHeader: {
      backgroundColor: '#205395',
      borderRadius: 5,
      //  flexDirection: 'row',
      //  justifyContent: 'space-between',
      //  alignItems: 'center',
      padding: 5,
      margin: 5
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      margin: 5
    },
    contentText: {
      fontSize: 16,
      color: '#000',
      marginLeft: 5
    },
    order: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingRight: 5
    }
  });
  