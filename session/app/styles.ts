import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const THUMB_SIZE = (width - 40 - 16) / 2; 
// 40 = horizontal padding; 16 = space between columns

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  containerTwo: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  phaseText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#555",
    marginBottom: 8,
    letterSpacing: 1,
    fontFamily: "PlayfairDisplay",
  },
  timerText: {
    fontSize: 72,
    fontWeight: "300",
    color: "#111",
    marginVertical: 16,
    fontFamily: "PlayfairDisplay",
  },
  progressContainer: {
    width: "80%",
    height: 4,
    backgroundColor: "#eee",
    borderRadius: 2,
    overflow: "hidden",
    marginBottom: 128,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#111",
  },
  button: {
    width: "50%",
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#111",
    marginBottom: 12,
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
    fontFamily: "PlayfairDisplay",
  },

  // new profile-specific styles
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#eee",
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
    marginBottom: 4,
    fontFamily: "PlayfairDisplayItalic",
  },
  bio: {
    fontSize: 14,
    color: "#555",
    marginBottom: 8,
    fontFamily: "PlayfairDisplay",
  },

  // reuse statsText for “X Completed Seshns”

  activityRow: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  activityThumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  textBox: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#111",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  }
});
