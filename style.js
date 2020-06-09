import { StyleSheet } from "react-native"

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightgrey",
    },

    header: {
        justifyContent: "center",
        alignItems: "center",
    },

    carousel_container: {
        justifyContent: "center",
        alignItems: "center",
        height: "80%"
    },

    carousel_item_container: {
        alignItems: "center",
        justifyContent: "center",
        height: "85%",
        borderRadius: 15,
        backgroundColor: "white",
    },

    contentContainerCustomStyle: {
        alignItems: "center"
    },
});
