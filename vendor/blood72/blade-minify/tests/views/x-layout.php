<?php if (isset($component)) { $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4 = $component; } ?>
<?php $component = $__env->getContainer()->make(Illuminate\View\AnonymousComponent::class, ['view' => 'components.layout','data' => []]); ?>
<?php $component->withName('layout'); ?>
<?php if ($component->shouldRender()): ?>
    <?php $__env->startComponent($component->resolveView(), $component->data()); ?>
    <?php $component->withAttributes([]); ?>
    <?php $__env->slot('title'); ?>
    Custom Title
    <?php $__env->endSlot(); ?>

    <?php $__currentLoopData = $tasks; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $task): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
        <?php echo e($task); ?>

    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    <?php if (isset($__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4)): ?>
        <?php $component = $__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4; ?>
        <?php unset($__componentOriginalc254754b9d5db91d5165876f9d051922ca0066f4); ?>
    <?php endif; ?>
    <?php echo $__env->renderComponent(); ?>
<?php endif; ?>
