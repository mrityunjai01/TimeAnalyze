import React, { Component, useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: "#ccffff",
    },
    inputWrapper: {
        height: "50%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',

        top: 0,
    },
    upper_section: {
        minHeight: 150,
        // backgroundColor: "yellow",
    },
    button: {

        alignItems: "center",
    },
    inputSearch: {
        textAlign: "center",
        color: 'black',
        minHeight: 100,
        fontSize: 50,
    },
    palette_view: {
        flex: 1,
        // backgroundColor: "tan",
    },
    grain_style: {
        // backgroundColor: "red",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderColor: "55eeff",
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 5,

    },
    grain_text: {
        fontSize: 50,
        color: "#033363",
    },
    right_swipe_text: {
        fontSize: 20,
        color: "#ccb3db"
    },
    left_swipe_text: {
        fontSize: 20,
        color: "#ccb3db"
    },
    palette_view_under_right: {
        flex: 1,
        flexDirection: "row-reverse",
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    grain_edit_textinput: {
        fontSize: 40,
        flex: 1,   
    }
})
const cyrb53 = function(str, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1>>>16), 2246822507) ^ Math.imul(h2 ^ (h2>>>13), 3266489909);
    h2 = Math.imul(h2 ^ (h2>>>16), 2246822507) ^ Math.imul(h1 ^ (h1>>>13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1>>>0);
};

const UnderRight = ({ undoSelect, deleteGrain, editGrain }) => {
    const [editing, setEditing] = useState(false)
    return (
        <View style={styles.palette_view_under_right}>
            <TouchableOpacity onPress={undoSelect}>
                <MaterialCommunityIcons name="arrow-u-left-top-bold" color="#033363" size={50} />
            </TouchableOpacity>
            <TouchableOpacity onPress={deleteGrain}>
                <MaterialCommunityIcons name="trash-can" color="#033363" size={50} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {setEditing(true)}}>
                <MaterialCommunityIcons name="pen" color="#033363" size={50} />
            </TouchableOpacity>
            {
                editing
                    ?
                    <TextInput
                        style = {styles.grain_edit_textinput}
                        onSubmitEditing={(event) => {
                            editGrain(event.nativeEvent.text)
                            setEditing(false)
                        }} />
                    :
                    null
            }

        </View>
    )
}

const UnderLeft = () => (
    <View style={styles.palette_view}>
        <Text style={styles.right_swipe_text}> Swiping right selects this. Left to undo. </Text>
    </View>
)
const Grain = ({ text, swap_with_top, ...options }) => {
    return (
        <GestureHandlerRootView>

            <Swipeable
                renderRightActions={() => <UnderRight {...options} />}
                renderLeftActions={() => <UnderLeft />}
                onSwipeableWillClose={swap_with_top}
            >

                <View style={styles.grain_style}>

                    <Text style={styles.grain_text}>
                        {text}
                    </Text>
                </View>
            </Swipeable>
        </GestureHandlerRootView>
    )
}
export default function Home({ navigation }) {
    const [grains, setGrains] = useState([])
    // const [grain_dictionary, setGD] = useState({})
    const [points, setPoints] = useState([])
    const [to_add, set_to_add] = useState(true)
    const [curr_idx, set_idx] = useState(1)
    const editGrain = (newText, index) => {
        setGrains((curr_grains) => {
            let copy_array = curr_grains.slice()
            copy_array[index].text = newText
            return copy_array
        })
    }
    const add_grain = (grain_text) => {
        
        setGrains((curr_grains) => ([ { text: grain_text, key: curr_idx, hash: cyrb53(grain_text) }, ...curr_grains]))
    }
    const deleteGrain = (index) => {
        setGrains((curr_grains) => {
            let copy_array = curr_grains.slice()
            copy_array.splice(index, 1)
            return copy_array
        })
    } 
    const undoSelectedPoint = (hash) => {
        if (points.length && points.at(-1) !== hash) return
        setPoints((points) => (points.slice(0, -1)))
    }
    const addSelectPoint = (hash) => {
        const ind = grains.findIndex((grain) => (grain.hash===hash))
        
        const grains_copy = grains.slice()
        const temp = grains[0]
        grains_copy[0] = grains_copy[ind]
        grains_copy[ind] = temp
        setGrains(grains_copy)
        setPoints((points) => ([...points, { ts: new Date(), hash: hash }]))
    }
    return (
        <View style={styles.container}>
            <View style={styles.upper_section}>

                {
                    to_add ?
                        <TouchableOpacity
                            style={styles.button}
                            onPress={
                                () => {
                                    if (to_add) {
                                        set_to_add(false)
                                    }

                                }
                            }>
                            <MaterialCommunityIcons name="plus" color="#033363" size={200} />
                        </TouchableOpacity>
                        :
                        (
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    autoFocus={true}
                                    style={styles.inputSearch}
                                    onSubmitEditing={(event) => {
                                        set_idx((curr_idx) => (curr_idx + 1))
                                        add_grain(event.nativeEvent.text)
                                        set_to_add(true)
                                    }} />

                            </View>
                        )


                }
            </View>
            <FlatList
                data={grains}
                keyExtractor={(item) => item.key}
                renderItem={
                    ({ item, index }) =>
                        <Grain
                            text={item.text}
                            key={item.key}
                            swap_with_top={(dir) => {
                                if (dir==='left') {

                                    addSelectPoint(item.hash)
                                }
                            }}
                            deleteGrain={() => deleteGrain(index)}
                            editGrain={(newtext) => editGrain( index, newtext)} />}
            />
        </View>
    )
}