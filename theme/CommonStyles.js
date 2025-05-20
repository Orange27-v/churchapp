// styles.js
import { theme } from "../theme";

export const commonStyles = {
    container: {
        flex: 1,
        backgroundColor: "#f2f2f2",
      },
      goBackButton: {
        justifyContent: "start",
        alignItems: "start",
        padding: 20,
        marginTop: Platform.OS === 'android' ? 50 : 0,
      },
      InputArea: {
        flex: 1,
        justifyContent: "center",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        marginBottom: 120,
      },
      title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: "bold",
      },
      input: {
        width: "100%",
        height: 50,
        borderBottomWidth: 2,
        borderColor: theme.red,
        paddingHorizontal: 15,
        marginBottom: 15,
      },
    
      // ... Other styles ...
  };
  