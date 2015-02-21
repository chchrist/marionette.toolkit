import Backbone from 'backbone';
import Marionette from 'backbone.marionette';

/**
 * Marionette.Object with a Backbone.Model for keeping state.
 *
 * @public
 * @class StateClass
 * @memberOf Toolkit
 * @memberOf Marionette
 */
var StateClass = Marionette.Object.extend({

  /**
   * The model class for _stateModel.
   * @type {Backbone.Model}
   * @default Backbone.Model
   */
  StateModel: Backbone.Model,

  /**
   * @public
   * @constructs StateClass
   * @param {Object} [options] - Settings for the stateClass.
   * @param {Object} [options.stateEvents] - Event hash bound from _stateModel to stateClass.
   * @param {Object} [options.StateModel] - Model class for _stateModel.
   */
  constructor: function(options){
    options = options || {};

    // Get the StateModel from options or the class definition
    var StateModel = options.StateModel || this.StateModel;

    this._stateModel = new StateModel();

    // Bind events from the _stateModel defined in stateEvents hash
    this.bindEntityEvents(this._stateModel, this.getOption('stateEvents'));

    Marionette.Object.call(this, options);
  },

  /**
   * Set a property on the _stateModel.
   *
   * @public
   * @method setState
   * @memberOf StateClass
   * @param {String|Object} key - Attribute name or Hash of any number of key value pairs.
   * @param {*=} value - Attribute value if key is String, replaces options param otherwise.
   * @param {Object=} options - Backbone.Model options.
   * @returns {Backbone.Model} - The _stateModel
   */
  setState: function(){
    return this._stateModel.set.apply(this._stateModel, arguments);
  },

  /**
   * Get a property from the _stateModel, or return the _stateModel
   *
   * @public
   * @method getState
   * @memberOf StateClass
   * @param {String=} attr - Attribute name of stateModel.
   * @returns {Backbone.Model|*} - The _stateModel or the attribute value of the _stateModel
   */
  getState: function(attr){
    if(!attr) {
      return this._stateModel;
    }

    return this._stateModel.get.apply(this._stateModel, arguments);
  },

  /**
   * Destroy the stateClass and clean up any listeners on the _stateModel.
   *
   * @public
   * @method destroy
   * @memberOf StateClass
   */
  destroy: function(){
    this._stateModel.stopListening();

    Marionette.Object.prototype.destroy.apply(this, arguments);
  }
});

export default StateClass;
