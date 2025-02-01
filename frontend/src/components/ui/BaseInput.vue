<template>
  <div class="base-input">
    <input
      :type="type"
      :value="modelValue"
      :id="id"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
      class="input-field"
    />
    <span v-if="icon" class="input-icon">
      <i :class="icon"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    icon: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    }
  },
  emits: ['update:modelValue']
}
</script>

<style scoped>
.base-input {
  position: relative;
  display: inline-block;
  width: 100%;
}

.input-field {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  line-height: 1.5;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  transition: border-color 0.2s;
  outline: none;
}

.input-field:focus {
  border-color: #409eff;
}

.input-field:disabled {
  background-color: #f5f7fa;
  cursor: not-allowed;
}

.input-icon {
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  color: #c0c4cc;
}
</style>
