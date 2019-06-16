import React, { Component } from "react";
import ImagePicker from "react-native-image-picker";
import api from "../services/api";
import {
	View,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
} from "react-native";

export default class New extends Component {
	static navigationOptions = {
		headerTitle: "Nova pulicação",
	};
	state = {
		image: null,
		preview: null,
		author: "",
		place: "",
		description: "",
		hashtags: "",
	};

	handleSubmit = async () => {
		const data = new FormData();
		data.append("image", this.state.image);
		data.append("author", this.state.author);
		data.append("place", this.state.place);
		data.append("description", this.state.description);
		data.append("hashtags", this.state.hashtags);
		await api.post("posts", data);
		this.props.navigation.navigate("Feed");
	};

	handleImageSelect = () => {
		ImagePicker.showImagePicker(
			{
				title: "Selecionar imagem",
			},
			upload => {
				if (upload.error) {
					console.log(`Error: ${upload.error}`);
				} else if (upload.didCancel) {
					console.log("Envio cancelado");
				} else {
					const preview = {
						uri: `data:image/jpeg;base64,${upload.data}`,
					};

					let name;
					let ext;
					if (upload.fileName) {
						[name, ext] = upload.fileName.split(".");
						ext = ext.toLowerCase() == "heic" ? "jpg" : ext;
					} else {
						name = new Date().getTime();
						ext = "jpg";
					}

					const image = {
						uri: upload.uri,
						type: upload.type,
						name: `${name}.${ext}`,
					};
					this.setState({ preview, image });
				}
			}
		);
	};
	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.selectImageButton}
					onPress={this.handleImageSelect}
				>
					<Text style={styles.selectImageText}>Selecionar imagem</Text>
				</TouchableOpacity>

				{this.state.preview && (
					<Image style={styles.preview} source={this.state.preview} />
				)}

				<TextInput
					style={styles.input}
					autoCapitalize="none"
					placeholder="Nome do autor"
					placeholderTextColor="#999"
					onChangeText={author => {
						this.setState({ author });
					}}
					value={this.state.author}
				/>
				<TextInput
					style={styles.input}
					autoCapitalize="none"
					placeholder="Local"
					placeholderTextColor="#999"
					onChangeText={place => {
						this.setState({ place });
					}}
					value={this.state.place}
				/>
				<TextInput
					style={styles.input}
					autoCapitalize="none"
					placeholder="Descrição"
					placeholderTextColor="#999"
					onChangeText={description => {
						this.setState({ description });
					}}
					value={this.state.description}
				/>
				<TextInput
					style={styles.input}
					autoCapitalize="none"
					placeholder="Hashtags"
					placeholderTextColor="#999"
					onChangeText={hashtags => {
						this.setState({ hashtags });
					}}
					value={this.state.hashtags}
				/>
				<TouchableOpacity
					style={styles.shareButton}
					onPress={this.handleSubmit}
				>
					<Text style={styles.shareButtonText}>Compartilhar</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 20,
	},
	selectImageButton: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "#CCC",
		borderStyle: "dashed",
		height: 42,
	},
	selectImageText: {
		fontSize: 16,
		color: "#666",
	},
	preview: {
		width: 200,
		height: 200,
		marginTop: 10,
		alignSelf: "center",
		borderRadius: 4,
	},
	input: {
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 4,
		borderWidth: 1,
		borderColor: "#CCC",
		padding: 15,
		marginTop: 10,
		fontSize: 16,
	},
	shareButton: {
		backgroundColor: "#7159c1",
		borderRadius: 4,
		height: 42,
		marginTop: 15,
		justifyContent: "center",
		alignItems: "center",
	},
	shareButtonText: {
		fontWeight: "bold",
		fontSize: 16,
		color: "#FFF",
	},
});
