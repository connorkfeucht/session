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
    width: "45%",
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
    marginVertical: 20,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 12,
    borderColor: "#111",
    paddingHorizontal: 12,
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
    marginBottom: 4,
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
  },
  singleActivityRow: {
    marginBottom: 16,
    alignItems: "center", // or flex-start if you want them left-aligned
  },



  // home.tsx

  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 12,
  },
  activityCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    // iOS shadow
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    // Android elevation
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  activityTitle: {
    fontFamily: "PlayfairDisplay",
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    marginBottom: 6,
  },
  activityDesc: {
    fontFamily: "PlayfairDisplay",
    fontSize: 14,
    color: "#555",
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  metaItem: {
    fontFamily: "SpaceMono",
    fontSize: 14,
    color: "#777",
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  activityThumbLarge: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
  },
  likeButton: {
    marginLeft: "auto",
  }

});
