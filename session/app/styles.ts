import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  phaseText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginBottom: 8,
    letterSpacing: 1,
  },
  timerText: {
    fontSize: 72,
    fontWeight: "300",
    color: "#111",
    marginVertical: 16,
    fontFamily: "SpaceMono",
  },
  progressContainer: {
    width: "80%",
    height: 4,
    backgroundColor: "#eee",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 32,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#111",
  },
  button: {
    width: "60%",
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#111",
    marginBottom: 24,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
    fontFamily: "PlayfairDisplay",
  },
  statsText: {
    fontSize: 14,
    color: "#555",
  },
});
