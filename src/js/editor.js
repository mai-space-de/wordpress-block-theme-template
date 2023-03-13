// /**
//  * WordPress dependencies
//  */
// import {
// 	unregisterBlockType,
// 	unregisterBlockStyle,
// 	unregisterBlockVariation,
// 	registerBlockStyle,
// 	registerBlockVariation,
// } from "@wordpress/blocks";
// import { dispatch } from "@wordpress/data";
// import domReady from "@wordpress/dom-ready";
// // if (null !== dispatch("core/edit-post")) {
// // 	const { removeEditorPanel } = dispatch("core/edit-post");
// // }

// /**
//  * Unregister blocks
//  *
//  * @type {Array} Add the names of blocks to unregister here
//  * @see https://developer.wordpress.org/block-editor/reference-guides/filters/block-filters/#using-a-deny-list
//  */
// const unregisterBlocks = ["core/verse"];

// /**
//  * Remove editor panels
//  *
//  * @type {Array} Add the names of panels to remove here
//  * @see https://developer.wordpress.org/block-editor/reference-guides/data/data-core-edit-post/#removeeditorpanel
//  */
// const removeEditorPanels = ["discussion-panel"];

// /**
//  * Remove block styles
//  *
//  * @type {Object} Add the names of blocks and styles to remove here
//  * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-styles/
//  */
// const unregisterBlockStyles = {
// 	"core/button": "outline",
// };

// /**
//  * Register block styles
//  *
//  * @type {Object} Add the names of blocks and styles to register here
//  * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-styles/
//  */
// const registerBlockStyles = {
// 	"core/cover": {
// 		name: "hero",
// 		label: "Hero",
// 	},
// };

// /**
//  * Remove block variations
//  *
//  * @type {Object} Add the names of blocks and variations to remove here
//  * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
//  */
// const unregisterBlockVariations = {
// 	"core/columns": "two-columns-two-thirds-one-third",
// };

// /**
//  * Register block variations
//  *
//  * @type {Object} Add the names of blocks and variations to register here
//  * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-variations/
//  */
// const registerBlockVariations = {
// 	"core/columns": {
// 		name: "three-columns-wide-left",
// 		title: "50 / 25 / 25",
// 		description: "Three columns; wide left column",
// 		innerBlocks: [
// 			["core/column", { width: "50%" }],
// 			["core/column", { width: "25%" }],
// 			["core/column", { width: "25%" }],
// 		],
// 		scope: ["block"],
// 	},
// };

// /**
//  * Here we hook into the editor initialization and unregister the blocks,
//  * remove editor panels, remove block styles, remove block variations,
//  * register block styles, and register block variations – all as defined above.
//  */
// domReady(function () {
// 	unregisterBlocks.forEach((block) => {
// 		unregisterBlockType(block);
// 	});
// 	// Only run if we are in the post editor
// 	// if (null !== dispatch("core/edit-post")) {
// 	// 	removeEditorPanels.forEach((panel) => {
// 	// 		removeEditorPanel(panel);
// 	// 	});
// 	// }
// 	Object.keys(unregisterBlockStyles).forEach((block) => {
// 		unregisterBlockStyle(block, unregisterBlockStyles[block]);
// 	});
// 	Object.keys(unregisterBlockVariations).forEach((block) => {
// 		unregisterBlockVariation(block, unregisterBlockVariations[block]);
// 	});
// 	Object.keys(registerBlockStyles).forEach((block) => {
// 		registerBlockStyle(block, registerBlockStyles[block]);
// 	});
// 	Object.keys(registerBlockVariations).forEach((block) => {
// 		registerBlockVariation(block, registerBlockVariations[block]);
// 	});
// });

// import { addFilter } from "@wordpress/hooks";
// import { select } from "@wordpress/data";

// function disableHeadingTextColorInMediaText(
// 	settingValue,
// 	settingName,
// 	clientId,
// 	blockName,
// ) {
// 	if (blockName === "core/heading") {
// 		const { getBlockParents, getBlockName } = select("core/block-editor");

// 		const blockParents = getBlockParents(clientId, true);
// 		const inMediaText = blockParents.some(
// 			(ancestorId) => getBlockName(ancestorId) === "core/media-text",
// 		);
// 		if (inMediaText && settingName === "color.text") {
// 			return false;
// 		}
// 	}

// 	return settingValue;
// }

// addFilter(
// 	"blockEditor.useSetting.before",
// 	"tangent-block-editor/useSetting.before",
// 	disableHeadingTextColorInMediaText,
// );

import { addFilter } from "@wordpress/hooks";
import { useSelect } from "@wordpress/data";

function disableHeadingTextColorInMediaText(
	settingValue,
	settingName,
	clientId,
	blockName,
) {
	if (blockName === "core/heading") {
		// const blockParents = useSelect((select) => {
		// 	return select("core/block-editor").getBlockParents(clientId, true);
		// }, []);
		// console.log(blockParents);
		const { inMediaText } = useSelect((select) => {
			let blockParents = select("core/block-editor").getBlockParents(
				clientId,
				true,
			);
			let inMediaText = blockParents.some(
				(ancestorId) =>
					select("core/block-editor").getBlockName(ancestorId) ===
					"core/media-text",
			);
			return {
				inMediaText: inMediaText,
			};
		}, []);
		// if (inMediaText && settingName === "color.text") {
		// 	return false;
		// }
	}

	return settingValue;
}

addFilter(
	"blockEditor.useSetting.before",
	"tangent-block-editor/useSetting.before",
	disableHeadingTextColorInMediaText,
);

/**
 * Disable text color controls on Heading blocks
 * when placed inside of Media & Text blocks.
 */
// addFilter(
// 	"blockEditor.useSetting.before",
// 	"tangent/useSetting.before",
// 	(settingValue, settingName, clientId, blockName) => {
// 		if (blockName === "core/heading") {
// 			const blockParents = getBlockParents(clientId, true);
// 			const inMediaText = blockParents.some(
// 				(ancestorId) => getBlockName(ancestorId) === "core/media-text",
// 			);
// 			console.log(inMediaText);
// 			if (inMediaText && settingName === "color.text") {
// 				return false;
// 			}
// 		}

// 		return settingValue;
// 	},
// );

// const { getBlockName, getBlockParents } = wp.data.select("core/block-editor");

// wp.hooks.addFilter(
// 	"blockEditor.useSetting.before",
// 	"test/disable-heading-text-color-in-media-text",
// 	(result, path, clientId, blockName) => {
// 		if (blockName === "core/heading") {
// 			const blockParents = getBlockParents(clientId, true);
// 			const inMediaText = blockParents.some(
// 				(ancestorId) => getBlockName(ancestorId) === "core/media-text",
// 			);

// 			if (inMediaText && path === "color.text") {
// 				// Disable text color selection
// 				result = false;
// 			}
// 		}

// 		return result;
// 	},
// );
