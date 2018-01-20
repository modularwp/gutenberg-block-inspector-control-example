<?php
/**
 * Plugin Name: Gutenberg Block: Controls Example
 * Plugin URI: https://github.com/modularwp/gutenberg-block-controls-example
 * Description: An example Gutenberg block with custom contols.
 * Author: ModularWP
 * Author URI: https://modularwp.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue the block's assets for the editor.
 *
 * Javascript dependencies:
 * wp-blocks:      The registerBlockType() function to register blocks.
 * wp-element:     The wp.element.createElement() function to create elements.
 * wp-i18n:        The __() function for internationalization.
 *
 * CSS dependencies:
 * wp-edit-blocks: The WordPress core backend block styles.
 *
 * @since 1.0.0
 */
function mdlr_block_controls_example_backend_enqueue() {
	wp_enqueue_script(
		'mdlr-block-controls-example-backend-script', // Unique handle.
		plugins_url( 'block.js', __FILE__ ), // Block.js: We register the block here.
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ), // Dependencies, defined above.
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' ) // filemtime — Gets file modification time.
	);

	wp_enqueue_style(
		'mdlr-block-controls-example-backend-style', // Handle.
		plugins_url( 'editor.css', __FILE__ ), // editor.css: This file styles the block within the Gutenberg editor.
		array( 'wp-edit-blocks' ), // Dependencies, defined above.
		filemtime( plugin_dir_path( __FILE__ ) . 'editor.css' ) // filemtime — Gets file modification time.
	);
}
add_action( 'enqueue_block_editor_assets', 'mdlr_block_controls_example_backend_enqueue' );

/**
 * Enqueue the block's assets.
 *
 * It should be noted that this hook fires on both the frontend
 * and the backend.
 *
 * CSS dependencies:
 * wp-blocks: The WordPress core block styles.
 *
 * @since 1.0.0
 */
function mdlr_block_controls_example_enqueue() {
	wp_enqueue_style(
		'mdlr-block-controls-example-style', // Handle.
		plugins_url( 'style.css', __FILE__ ), // style.css: This file styles the block on the frontend.
		array( 'wp-blocks' ), // Dependencies, defined above.
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' ) // filemtime — Gets file modification time.
	);
}
add_action( 'enqueue_block_assets', 'mdlr_block_controls_example_enqueue' );
