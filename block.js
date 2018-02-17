/**
 * Block Styles Example
 *
 * https://github.com/modularwp/gutenberg-block-styles-example
 */
( function() {
	var __                = wp.i18n.__; // The __() function for internationalization.
	var createElement     = wp.element.createElement; // The wp.element.createElement() function to create elements.
	var registerBlockType = wp.blocks.registerBlockType; // The registerBlockType() function to register blocks.
	var Editable          = wp.blocks.Editable; // For creating editable elements.
	var InspectorControls = wp.blocks.InspectorControls; // For adding block controls.
	var ToggleControl     = wp.blocks.InspectorControls.ToggleControl; // For adding toggle controls to block settings panels.

	/**
	 * Register block
	 *
	 * @param  {string}   name     Block name.
	 * @param  {Object}   settings Block settings.
	 * @return {?WPBlock}          Block itself, if registered successfully,
	 *                             otherwise "undefined".
	 */
	registerBlockType(
		'mdlr/block-inspector-controls-example', // Block name. Must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
		{
			title: __( 'Inspector Control Example' ), // Block title. __() function allows for internationalization.
			description: __( 'Block description can be added here...' ), // Block description.
			icon: 'admin-settings', // Block icon from Dashicons. https://developer.wordpress.org/resource/dashicons/.
			category: 'common', // Block category. Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
			attributes: {
				content: {
					type: 'string',
					default: 'Block with styles that can be toggled with an inspector control.',
				},
				applyStyles: {
					type: 'string',
					default: '',
				},
			},

			// Defines the block within the editor.
			edit: function( {attributes, setAttributes, focus, className} ) {
				const {
					content,
					applyStyles,
				} = attributes;

				function onChangeContent( updatedContent ) {
					setAttributes( { content: updatedContent } );
				}

				function onChangeStyleSettings() {
					if ( applyStyles ) {
						setAttributes( { applyStyles: '' } );
					} else {
						setAttributes( { applyStyles: 'styled' } );
					}
				}

				const controls = focus && [
					createElement(
						InspectorControls,
						{},
						createElement(
							ToggleControl,
							{
								label: __('Apply Styles'),
								checked: !!applyStyles,
								onChange: onChangeStyleSettings
							}
						),
					),
				];

				return [controls,
					createElement(
						Editable,
						{
							tagName: 'p',
							className: className + ' ' + applyStyles,
							value: content,
							onChange: onChangeContent
						},
					),
				];
			},

			// Defines the saved block.
			save: function( {attributes} ) {
				const {
					content,
					applyStyles,
				} = attributes;

				return createElement(
					'p',
					{
						className: applyStyles,
					},
					content
				);
			},
		}
	);
})();
